package com.books.controllers.rest;

import com.books.entity.Book;
import com.books.entity.User;
import com.books.exceptions.BookNotFoundException;
import com.books.repo.BookOfUserRepo;
import com.books.repo.BookRepo;
import com.books.repo.UserFriendRepo;
import com.books.repo.UserRepo;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author nik
 */
@RestController
@RequestMapping("/books")
public class BookController {
    private final BookRepo bookRepo;
    private final BookOfUserRepo bookOfUserRepo;
    private final UserRepo userRepo;
    private final UserFriendRepo userFriendRepo;
    
    /*----------------------*/
    /*-----------    Book init Segment    -----------*/
    /*----------------------*/
    
    @Autowired
    BookController(BookRepo bookRepo,
                           UserRepo userRepo,
                           BookOfUserRepo bookOfUserRepo,
                           UserFriendRepo userFriendRepo) {
        this.bookRepo = bookRepo;
        this.userRepo = userRepo;
        this.bookOfUserRepo = bookOfUserRepo;
        this.userFriendRepo = userFriendRepo;
    }
    
    /*----------------------*/
    /*-----------    Book Segment    -----------*/
    /*----------------------*/
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> createBook(@RequestBody @Valid Book book) {
        Book temp = bookRepo.save(book);
        return new ResponseEntity<>(temp, new HttpHeaders(), HttpStatus.CREATED);
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllBooks() {
        
        return new ResponseEntity<Object>(bookRepo.findAll(), new HttpHeaders(), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/{bookId}")
    public ResponseEntity<?> findBook(@PathVariable Long bookId/*, @RequestBody Book input*/) {

        this.validateBook(bookId);
        return new ResponseEntity<Object>(bookRepo.findById(bookId), new HttpHeaders(), HttpStatus.OK);
    }
    
    private void validateBook(Long bookId) {
        this.bookRepo.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));
    }
}
