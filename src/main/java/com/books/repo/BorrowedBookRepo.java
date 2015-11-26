/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.repo;

import com.books.entity.BookOfUser;
import com.books.entity.BorrowedBook;
import com.books.entity.User;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author nik
 */
@Transactional
public interface BorrowedBookRepo extends PagingAndSortingRepository<BorrowedBook, Long> {

    Optional<BorrowedBook> findByOwnerIdAndBorrowerId(@Param("oId") Long oId, @Param("bId") Long bId);
    
    Optional<BorrowedBook> findByOwnerIdAndBookId(@Param("oId") Long oId, @Param("bId") Long bId);
    
    Optional<BorrowedBook> findByBorrowerIdAndBookId(@Param("boId") Long boId, @Param("bId") Long bId);
    
    List<User> findByOwnerId(@Param("id") Long id);
    
    List<User> findByBorrowerId(@Param("id") Long id);
    
    List<BorrowedBook> findByBookId(@Param("id") Long id);
    
    List<BorrowedBook> findByBorrowerIdAndDateBorrowedNull(@Param("id") Long id/*, @Param("date") Date date*/);
    
    Optional<BorrowedBook> findByBorrowerIdAndBookIdAndDateBorrowedNull(@Param("id") Long id, @Param("bookId") Long bookId);
    
    Optional<BorrowedBook> findByBorrowerIdAndBookIdAndReturned(@Param("id") Long id, @Param("bookId") Long bookId, @Param("returned") boolean returned);
    
    /* Used to find/delete/accept pending book requests */
    Optional<BorrowedBook> findByBorrowerIdAndBookIdAndReturnedAndDateBorrowedNull(@Param("id") Long id, @Param("bookId") Long bookId, @Param("returned") boolean returned);
    
    /* Used when returning a borrowed book */
    Optional<BorrowedBook> findByBorrowerIdAndBookIdAndReturnedAndDateBorrowedNotNull(@Param("id") Long id, @Param("bookId") Long bookId, @Param("returned") boolean returned);
}
