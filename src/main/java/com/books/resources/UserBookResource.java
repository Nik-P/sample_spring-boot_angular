/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.resources;

import com.books.controllers.rest.UserController;
import com.books.entity.BookOfUser;
/*import org.springframework.hateoas.ResourceSupport;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;*/


/**
 *
 * @author nik
 */
public class UserBookResource {
/* extends ResourceSupport 
    private final BookOfUser book;

    public UserBookResource(BookOfUser book) {
        //String username = book.getUser().getUsername();
        this.book = book;
        this.add(linkTo(UserController.class, book.getUser().getId()).withRel("book"));
        //this.add(linkTo(methodOn(UserController.class, book.getUser().getId()).readBookOfUser(username, book.getId())).withSelfRel());
    }

    public BookOfUser getBookmark() {
        return book;
    }*/
}
