/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.entity;

import com.books.entity.helpers.StartEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import org.hibernate.annotations.NaturalId;

/**
 *
 * @author nik
 */
@Entity
public class BookOfUser extends StartEntity {
    
    //@JsonIgnore
    @ManyToOne(optional = false)
    @NaturalId
    private User user;
    
    //@JsonIgnore
    @ManyToOne(/*fetch = FetchType.LAZY,*/ optional = false)
    @NaturalId
    private Book book;
    
    /*@OneToMany(mappedBy = "book")
    private Set<BorrowedBook> borrowedBook = new HashSet<>();*/
    
    private int noOfCopies;
    private int availability;
    
    protected BookOfUser() {
        
    }
    
    /*public BookOfUser(BookOfUser bookOfUser) {
        
    }*/

    /**
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return the book
     */
    public Book getBook() {
        return book;
    }

    /**
     * @param book the book to set
     */
    public void setBook(Book book) {
        this.book = book;
    }

    /**
     * @return the availability
     */
    public int getAvailability() {
        return availability;
    }
    
    public boolean lendBook() {
        if(availability <= 0){
            return false;
        }
        availability--;
        return true;
    }

    /**
     * @param availability the availability to set
     */
    public void setAvailability(int availability) {
        this.availability = availability;
    }

    /**
     * @return the noOfCopies
     */
    public int getNoOfCopies() {
        return noOfCopies;
    }

    /**
     * @param noOfCopies the noOfCopies to set
     */
    public void setNoOfCopies(int noOfCopies) {
        this.noOfCopies = noOfCopies;
    }

    /**
     * @return the borrowedBook
     */
   /* public Set<BorrowedBook> getBorrowedBook() {
        return borrowedBook;
    }*/

    /**
     * @param borrowedBook the borrowedBook to set
     */
   /* public void setBorrowedBook(Set<BorrowedBook> borrowedBook) {
        this.borrowedBook = borrowedBook;
    }*/


}
