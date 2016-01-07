/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.entity;

import com.books.entity.helpers.StartEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 *
 * @author nik
 */
@Entity
public class BorrowedBook extends StartEntity {
    //@JsonIgnore
    @ManyToOne(optional = false)
    private User owner;
    
    //@JsonIgnore
    @ManyToOne(optional = false)
    private User borrower;
    
    //@JsonIgnore
    @ManyToOne(optional = false)
    private BookOfUser book;
    
    private Date dateBorrowed;
    private boolean returned;
    private Date dateReturned;
    
    private String comment;

    protected BorrowedBook(){
        
    }
    
    public BorrowedBook(User borrower, BookOfUser book){
        this.borrower = borrower;
        this.owner = book.getUser();
        this.dateBorrowed = null;
        this.dateReturned = null;
        this.returned = false;
        //this.accepted = false;
        this.book = book;
    }
    
    /**
     * @return the owner
     */
    public User getOwner() {
        return owner;
    }

    /**
     * @param owner the owner to set
     */
    public void setOwner(User owner) {
        this.owner = owner;
    }

    /**
     * @return the borrower
     */
    public User getBorrower() {
        return borrower;
    }

    /**
     * @param borrower the borrower to set
     */
    public void setBorrower(User borrower) {
        this.borrower = borrower;
    }

    /**
     * @return the book
     */
    public BookOfUser getBook() {
        return book;
    }

    /**
     * @param book the book to set
     */
    public void setBook(BookOfUser book) {
        this.book = book;
    }

    /**
     * @return the dateborrowed
     */
    public Date getDateBorrowed() {
        return dateBorrowed;
    }

    /**
     * @param dateBorrowed the dateborrowed to set
     */
    public void setDateBorrowed(Date dateBorrowed) {
        this.dateBorrowed = dateBorrowed;
    }

    /**
     * @return the dateReturned
     */
    public Date getDateReturned() {
        return dateReturned;
    }

    /**
     * @param dateReturned the dateReturned to set
     */
    public void setDateReturned(Date dateReturned) {
        this.dateReturned = dateReturned;
    }

    /**
     * @return the returned
     */
    public boolean isReturned() {
        return returned;
    }

    /**
     * @param returned the returned to set
     */
    public void setReturned(boolean returned) {
        this.returned = returned;
    }

    /**
     * @return the comment
     */
    public String getComment() {
        return comment;
    }

    /**
     * @param comment the comment to set
     */
    public void setComment(String comment) {
        this.comment = comment;
    }
}
