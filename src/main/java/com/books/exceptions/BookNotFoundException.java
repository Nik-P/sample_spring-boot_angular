/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.exceptions;

/**
 *
 * @author nik
 */
public class BookNotFoundException extends RuntimeException {

    public BookNotFoundException(Long bookId) {
        super("could not find book '" + bookId + "'.");
    }
    
}