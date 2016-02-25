/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.controllers.rest;

import com.books.entity.Book;
import com.books.entity.BookOfUser;
import com.books.entity.BorrowedBook;
import com.books.entity.User;
import com.books.entity.UserFriend;
import com.books.exceptions.BookNotFoundException;
import com.books.exceptions.UserBookNotFoundException;
import com.books.exceptions.UserNotFoundException;
import com.books.repo.BookOfUserRepo;
import com.books.repo.BookRepo;
import com.books.repo.BorrowedBookRepo;
import com.books.repo.UserFriendRepo;
import com.books.repo.UserRepo;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
//import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author nik
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private final BookRepo bookRepo;
    private final BookOfUserRepo bookOfUserRepo;
    private final UserRepo userRepo;
    private final UserFriendRepo userFriendRepo;
    private final BorrowedBookRepo borrowedBookRepo;
    
    /*----------------------*/
    /*-----------    User Init Segment    -----------*/
    /*----------------------*/
    
    @Autowired
    UserController(BookRepo bookRepo,
                           UserRepo userRepo,
                           BookOfUserRepo bookOfUserRepo,
                           UserFriendRepo userFriendRepo,
                           BorrowedBookRepo borrowedBookRepo) {
        this.bookRepo = bookRepo;
        this.userRepo = userRepo;
        this.bookOfUserRepo = bookOfUserRepo;
        this.userFriendRepo = userFriendRepo;
        this.borrowedBookRepo = borrowedBookRepo;
    }
    
    /*----------------------*/
    /*-----------    User Segment    -----------*/
    /*----------------------*/
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody @Valid User user) {
        Optional authenticate = userRepo.findByEmail(user.getEmail());
        if(authenticate.isPresent()){
            return new ResponseEntity<Object>(authenticate.get(), new HttpHeaders(), HttpStatus.OK);
        }
        User temp = userRepo.save(user);
        return new ResponseEntity<>(temp, new HttpHeaders(), HttpStatus.CREATED);
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public ResponseEntity<?> loginUsers(@RequestBody @Valid User user) {

        if(!user.getEmail().isEmpty() && !user.getPassword().isEmpty()){
            Optional authenticate = userRepo.findByEmail(user.getEmail());//,user.getPassword());
            //User temp = authenticate.get();
            if(authenticate.isPresent()){
                return new ResponseEntity<Object>(authenticate.get(), new HttpHeaders(), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<Object>( new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        }
        //this.validateUser(userId);
        //bookRepo.save(new Book());
        //return userRepo.findById(userId);
        return new ResponseEntity<Object>(userRepo.findAll(), new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers(@RequestParam(value="email", required = false, defaultValue = "") String email) {

        if(!email.isEmpty()){
            Optional authenticate = userRepo.findByEmail(email);
            if(authenticate.isPresent()){
                return new ResponseEntity<Object>(authenticate.get(), new HttpHeaders(), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<Object>( new HttpHeaders(), HttpStatus.NOT_FOUND);
            }
        }
        //this.validateUser(userId);
        //bookRepo.save(new Book());
        //return userRepo.findById(userId);
        return new ResponseEntity<Object>(userRepo.findAll(), new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}")
    public ResponseEntity<?> findUser(@PathVariable Long userId/*, @RequestBody Book input*/) {

        this.validateUser(userId);
        //bookRepo.save(new Book());
        //return userRepo.findById(userId);
        return new ResponseEntity<Object>(userRepo.findById(userId).get(), new HttpHeaders(), HttpStatus.OK);
    }
    
    /*----------------------*/
    /*-----------    UserBooks Segment    -----------*/
    /*----------------------*/
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/books")
    public ResponseEntity<?> findUserBooks(@PathVariable Long userId , 
        @RequestParam(value = "limit", required=false, defaultValue = "10") int limit, 
        @RequestParam(value = "page", required=false, defaultValue = "0") int page,
        @RequestParam(value = "view", required=false, defaultValue = "") String view) {

        this.validateUser(userId);
        /*Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails) {
            UserDetails details = (UserDetails)principal;
            User loggedIn = userRepo.findByEmail(details.getUsername()).get();
            if(loggedIn.getId() == userId) {
                /*--- secured view :) ---*/
                if (view.isEmpty() || view.equals("friends")) {
                    return new ResponseEntity<Object>(bookRepo.findByUserFriends(new PageRequest(page, limit),userId), new HttpHeaders(), HttpStatus.OK);
                } else if (view.equals("friends-available")) {
                    return new ResponseEntity<Object>(bookRepo.findByUserFriendsWithAvailability(new PageRequest(page, limit),userId), new HttpHeaders(), HttpStatus.OK);
                    //return new ResponseEntity<Object>(bookRepo.findByUserFriends(userId), new HttpHeaders(), HttpStatus.OK);
                } else {
                    return new ResponseEntity<Object>(bookOfUserRepo.findByUserId(userId), new HttpHeaders(), HttpStatus.OK);
                }
                
       /*     } else {
                //throw new ForbiddenException();
                return new ResponseEntity<Object>("User not logged in", new HttpHeaders(), HttpStatus.FORBIDDEN);
            }
        } else {
            //throw new ForbiddenException();
            return new ResponseEntity<Object>("Restriction problem", new HttpHeaders(), HttpStatus.FORBIDDEN);
        }*/
        
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/books/{bookId}")
    public ResponseEntity<?> getUserBook(@PathVariable Long userId, @PathVariable Long bookId) {
        this.validateUser(userId);
        this.validateBook(bookId);
        Optional<BookOfUser> temp;
        temp = bookOfUserRepo.findByUserIdAndBookId(userId, bookId);
        if(temp.isPresent())
        {
            return new ResponseEntity<Object>(temp.get(), new HttpHeaders(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Object>(temp, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/{userId}/books/{bookId}")
    public ResponseEntity<?> newUserBook(@PathVariable Long userId, @PathVariable Long bookId, @RequestBody @Valid BookOfUser book) {
        this.validateUser(userId);
        this.validateBook(bookId);
        book.setUser(userRepo.findById(userId).get());
        book.setBook(bookRepo.findById(bookId).get());
        bookOfUserRepo.save(book);
        Optional<BookOfUser> temp;
        temp = bookOfUserRepo.findByUserIdAndBookId(userId, bookId);
        return new ResponseEntity<Object>(temp.get(), new HttpHeaders(), HttpStatus.CREATED);
    }
    
    /*----------------------*/
    /*-----------    UserFriends Segment    -----------*/
    /*----------------------*/
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/friends")
    public ResponseEntity<?> findUserFriends(@PathVariable Long userId/*, @RequestBody Book input*/) {

        this.validateUser(userId);
        //bookRepo.save(new Book());
        //return userRepo.findById(userId);
        return new ResponseEntity<Object>(userFriendRepo.findByUserId(userId), new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.PUT, value = "/{userId}/friends/{friendId}")
    public ResponseEntity<?> updateUserFriend(@PathVariable Long userId, @PathVariable Long friendId, @RequestBody UserFriend input) {
        if(Objects.equals(userId, friendId)){
            return new ResponseEntity<Object>
            ("A user can update a friendship when it's with another user, not himself!", 
                new HttpHeaders(), 
                HttpStatus.BAD_REQUEST);
        }
        this.validateUser(userId);
        this.validateUser(friendId);
        Optional<UserFriend> temp;
        temp = userFriendRepo.findByUserIdAndFriendId(userId, friendId);
        if(temp.isPresent())
        {
            UserFriend updated = temp.get();
            updated.setFollowFriend(input.getFollowFriend());
            //input.setId(temp.get().getId());
            userFriendRepo.save(updated);
            return new ResponseEntity<Object>(updated, new HttpHeaders(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Object>(temp, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/friends/{friendId}")
    public ResponseEntity<?> getUserFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        if(Objects.equals(userId, friendId)){
            return new ResponseEntity<Object>("A user can't be his own friend!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        this.validateUser(userId);
        this.validateUser(friendId);
        Optional<UserFriend> temp;
        temp = userFriendRepo.findByUserIdAndFriendId(userId, friendId);
        if(temp.isPresent())
        {
            return new ResponseEntity<Object>(temp.get(), new HttpHeaders(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Object>(temp, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        
    }
    
    @RequestMapping(method = RequestMethod.DELETE, value = "/{userId}/friends/{friendId}")
    public ResponseEntity<?> rejectUserFriend(@PathVariable Long userId, @PathVariable Long friendId, @RequestBody UserFriend input) {
        if(Objects.equals(userId, friendId)){
            return new ResponseEntity<Object>("A user cannot unfriend himself", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        /* Check if the friend has already sent a request */
        this.validateUser(userId);
        this.validateUser(friendId);
        Optional<UserFriend> temp;
        temp = userFriendRepo.findByUserIdAndFriendId(userId, friendId);
        if(temp.isPresent())
        {
            userFriendRepo.delete(temp.get());
            return new ResponseEntity<Object>(temp, new HttpHeaders(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Object>("The friend request you want to delete doesn't exist!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/{userId}/friends/{friendId}")
    public ResponseEntity<?> newUserFriend(@PathVariable Long userId, @PathVariable Long friendId, @RequestBody UserFriend input) {
        if(Objects.equals(userId, friendId)){
            return new ResponseEntity<Object>("A user can't be his own friend!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        /* Check if the friend has already sent a request */
        this.validateUser(userId);
        this.validateUser(friendId);
        Optional<UserFriend> temp;
        temp = userFriendRepo.findByUserIdAndFriendId(friendId, userId);
        if(temp.isPresent())
        {
            temp.get().setAccepted(true);
            temp.get().setApprovalDate(new Date());
            userFriendRepo.save(temp.get());
            input.setAccepted(true);
            input.setApprovalDate(temp.get().getApprovalDate());
        }
        else{
            input.setAccepted(false);
            input.setApprovalDate(null);
        }
        input.setUser(userRepo.findById(userId).get());
        input.setFriend(userRepo.findById(friendId).get());
        UserFriend temp2 = userFriendRepo.save(input);
        return new ResponseEntity<Object>(temp2, new HttpHeaders(), HttpStatus.CREATED);
        
    }
    
    /*----------------------*/
    /*-----------    BorrowedBook Segment    -----------*/
    /*----------------------*/
    
    /* user lents to others, the requests that have not been accepted yet */
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/lent")
    public ResponseEntity<?> getOtherUsersActiveBorrowRequests(@PathVariable Long userId) {
        
        /* Check if there is an open lend request for the book by the borrowing user */
        
        //borrowedBookRepo.findByBorrowerIdAndBookId(userId, bookId);
        //this.validateBorrowedBook(userId, bookId);
        List<BorrowedBook> temp;
        temp = borrowedBookRepo.findByOwnerIdAndReturnedAndDateBorrowedNull(userId,false);
        if(temp.isEmpty())
        {
            return new ResponseEntity<Object>("No active borrow request found!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<Object>(temp, new HttpHeaders(), HttpStatus.OK);
    }
    
    /* user borrows from others, the requests that have not been accepted yet */
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/borrow")
    public ResponseEntity<?> getUsersActiveBorrowRequests(@PathVariable Long userId) {
        
        /* Check if there is an open lend request for the book by the borrowing user */
        
        //borrowedBookRepo.findByBorrowerIdAndBookId(userId, bookId);
        //this.validateBorrowedBook(userId, bookId);
        List<BorrowedBook> temp;
        temp = borrowedBookRepo.findByBorrowerIdAndReturnedAndDateBorrowedNull(userId,false);
        if(temp.isEmpty())
        {
            return new ResponseEntity<Object>("No active borrow request found!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<Object>(temp, new HttpHeaders(), HttpStatus.OK);
    }
    
    /* user borrows from and lents to others, the requests that have not been accepted yet */
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/borrow-lent")
    public ResponseEntity<?> getUsersAndFriendsActiveBorrowRequests(@PathVariable Long userId) {
        
        /* Check if there is an open lend request for the book by the borrowing user */
        
        List<BorrowedBook> temp;
        temp = borrowedBookRepo.findByOwnerIdAndReturnedAndDateBorrowedNullOrBorrowerIdAndReturnedAndDateBorrowedNull(userId, false, userId,false);
        if(temp.isEmpty())
        {
            return new ResponseEntity<Object>("No active borrow request found!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<Object>(temp, new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/borrow/{bookId}")
    public ResponseEntity<?> getActiveBorrowRequest(@PathVariable Long userId, @PathVariable Long bookId) {
        
        /* Check if there is an open lend request for the book by the borrowing user */
        
        //borrowedBookRepo.findByBorrowerIdAndBookId(userId, bookId);
        //this.validateBorrowedBook(userId, bookId);
        Optional<BorrowedBook> temp;
        temp = borrowedBookRepo.findByBorrowerIdAndBookIdAndReturnedAndDateBorrowedNull(userId,bookId,false);
        if(!temp.isPresent())
        {
            return new ResponseEntity<Object>("No active borrow request found!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<Object>(temp.get(), new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/borrow/{bookId}/accept")
    public ResponseEntity<?> acceptBorrowRequest(@PathVariable Long userId, @PathVariable Long bookId) {
        
        /* Check if there is an open lend request for the book by the borrowing user */
        //this.validateBorrowedBook(userId, bookId);
        Optional<BorrowedBook> temp;
        temp = borrowedBookRepo.findByBorrowerIdAndBookIdAndReturnedAndDateBorrowedNull(userId,bookId,false);
        if(!temp.isPresent())
        {
            return new ResponseEntity<Object>("No active borrow request found!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        /* Is the book available to give */
        BookOfUser tempBook = bookOfUserRepo.findById(bookId).get();
        if(!tempBook.lendBook()){
            return new ResponseEntity<Object>("You have no available copies of the book to give", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        temp.get().setDateBorrowed(new Date());
        borrowedBookRepo.save(temp.get());
        bookOfUserRepo.save(tempBook);
        //temp = borrowedBookRepo.findByUserIdAndFriendId(userId, bookId);
        return new ResponseEntity<Object>(temp.get(), new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/borrow/{bookId}/return")
    public ResponseEntity<?> returnBorrowedBookRequest(@PathVariable Long userId, @PathVariable Long bookId) {
        
        /* Check if there is an open lend request for the book by the borrowing user */
        //this.validateBorrowedBook(userId, bookId);
        Optional<BorrowedBook> temp;
        temp = borrowedBookRepo.findByBorrowerIdAndBookIdAndReturnedAndDateBorrowedNull(userId,bookId,false);
        if(!temp.isPresent())
        {
            return new ResponseEntity<Object>("No active borrow request found!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        /* Is the book available to give */
        BookOfUser tempBook = bookOfUserRepo.findById(bookId).get();
        if(!tempBook.lendBook()){
            return new ResponseEntity<Object>("You have no available copies of the book to give", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        temp.get().setDateBorrowed(new Date());
        borrowedBookRepo.save(temp.get());
        bookOfUserRepo.save(tempBook);
        //temp = borrowedBookRepo.findByUserIdAndFriendId(userId, bookId);
        return new ResponseEntity<Object>(temp.get(), new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.DELETE, value = "/{userId}/borrow/{bookId}")
    public ResponseEntity<?> rejectBorrowRequest(@PathVariable Long userId, @PathVariable Long bookId, @RequestBody BorrowedBook input) {
        
        /* Check if there is an open lend request for the book by the borrowing user */
        //this.validateBorrowedBook(userId, bookId);
        Optional<BorrowedBook> temp;
        temp = borrowedBookRepo.findByBorrowerIdAndBookIdAndReturnedAndDateBorrowedNull(userId,bookId,false);
        if(!temp.isPresent())
        {
            return new ResponseEntity<Object>("No active borrow request found!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        
        borrowedBookRepo.delete(temp.get());
        return new ResponseEntity<Object>(/*temp.get()*/"Rejected borrow request", new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/{userId}/borrow/{bookId}")
    public ResponseEntity<?> newBorrowRequest(@PathVariable Long userId, @PathVariable Long bookId, @RequestBody BorrowedBook input) {
        /*if(Objects.equals(userId, bookId)){
            return new ResponseEntity<Object>("A user can't borrow from himself!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }*/
        validateUserBook(bookId);
        BookOfUser tempBook = bookOfUserRepo.findById(bookId).get();
        if(Objects.equals(userId, tempBook.getUser().getId())){
            return new ResponseEntity<Object>("A user can't borrow from himself!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        Optional<BorrowedBook> temp;
        temp = borrowedBookRepo.findByBorrowerIdAndBookIdAndDateBorrowedNull(userId,bookId);
        if(temp.isPresent())
        {
            return new ResponseEntity<Object>("A user can't borrow a book more than once!", new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
        input.update(userRepo.findById(userId).get(), tempBook);
        BorrowedBook temp2 = borrowedBookRepo.save(input);
        //temp = borrowedBookRepo.findByUserIdAndFriendId(userId, bookId);
        return new ResponseEntity<Object>(temp2, new HttpHeaders(), HttpStatus.CREATED);
    }
    
    /*----------------------*/
    /*-----------    Notifications Segment    -----------*/
    /*----------------------*/
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/notifications")
    public ResponseEntity<?> getAllUserNotifications(@PathVariable Long userId , 
        @RequestParam(value = "limit", required=false, defaultValue = "10") int limit, 
        @RequestParam(value = "page", required=false, defaultValue = "0") int page,
        @RequestParam(value = "view", required=false, defaultValue = "") String view) {

        this.validateUser(userId);
        
        /* Get incoming, unanswered friend requests */
        List<User> friendRequests;
        friendRequests = userFriendRepo.findByFriendIdAndAccepted(userId, false);
        
        List<BorrowedBook> bookRequests;
        bookRequests = borrowedBookRepo.findByOwnerIdAndReturnedAndDateBorrowedNull(userId, false);
        
        List<Object> allRequests;
        allRequests = new ArrayList();
        
        allRequests.addAll(friendRequests);
        allRequests.addAll(bookRequests);
        
        return new ResponseEntity<Object>(allRequests, new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/friend-requests")
    public ResponseEntity<?> getFriendRequests(@PathVariable Long userId , 
        @RequestParam(value = "limit", required=false, defaultValue = "10") int limit, 
        @RequestParam(value = "page", required=false, defaultValue = "0") int page,
        @RequestParam(value = "view", required=false, defaultValue = "") String view) {

        this.validateUser(userId);
        
        /* Get incoming, unanswered friend requests */
        List<User> friendRequests;
        friendRequests = userFriendRepo.findByFriendIdAndAccepted(userId, false);
        
        return new ResponseEntity<Object>(friendRequests, new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{userId}/active-borrowed-books")
    public ResponseEntity<?> getListOfActiveBorrowedBooks(@PathVariable Long userId , 
        @RequestParam(value = "limit", required=false, defaultValue = "10") int limit, 
        @RequestParam(value = "page", required=false, defaultValue = "0") int page,
        @RequestParam(value = "view", required=false, defaultValue = "") String view) {

        this.validateUser(userId);
        
        List<BorrowedBook> booksInCustody;
        booksInCustody = borrowedBookRepo.findByBorrowerIdAndReturnedAndDateBorrowedNotNull(userId, false);
        
        return new ResponseEntity<Object>(booksInCustody, new HttpHeaders(), HttpStatus.OK);
    }
    
    /*----------------------*/
    /*-----------    Private functions Segment    -----------*/
    /*----------------------*/
    
    private void validateUser(Long userId) {
        this.userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }
    
    private void validateBook(Long bookId) {
        this.bookRepo.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));
    }
    
    private void validateUserBook(Long bookId) {
        this.bookOfUserRepo.findById(bookId)
                .orElseThrow(() -> new UserBookNotFoundException(bookId));
    }
    
    private void validateBorrowedBook(Long userId ,Long bookId) {
        this.borrowedBookRepo.findByBorrowerIdAndBookId(userId, bookId)
                .orElseThrow(() -> new UserBookNotFoundException(bookId));
    }
    
}
