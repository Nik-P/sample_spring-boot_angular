/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.controllers.rest;

import com.books.entity.Book;
import com.books.repo.BorrowedBookRepo;
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
@RequestMapping("/borrowed")
public class BorrowedBookController {
    private final BorrowedBookRepo borrowedBookRepo;
    
    /*----------------------*/
    /*-----------    BorrowedBook Init Segment    -----------*/
    /*----------------------*/
    
    @Autowired
    BorrowedBookController(BorrowedBookRepo borrowedBookRepo) {
        this.borrowedBookRepo = borrowedBookRepo;
    }
    
    /*----------------------*/
    /*-----------    BorrowedBook Segment    -----------*/
    /*----------------------*/
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllBorrowRecords() {
        return new ResponseEntity<Object>(borrowedBookRepo.findAll(), new HttpHeaders(), HttpStatus.OK);
    }
    
    /*@RequestMapping(method = RequestMethod.GET, value = "/{bookId}")
    public ResponseEntity<?> findBook(@PathVariable Long bookId, @RequestBody Book input) {
        return new ResponseEntity<Object>(borrowedBookRepo.findById(bookId), new HttpHeaders(), HttpStatus.OK);
    }*/
}
