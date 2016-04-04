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
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 *
 * @author nik
 */
@Entity
public class User extends StartEntity {
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY ,mappedBy = "user")
    private Set<BookOfUser> userbook = new HashSet<>();
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY ,mappedBy = "user")
    private Set<UserFriend> user = new HashSet<>();
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY ,mappedBy = "friend")
    private Set<UserFriend> friend = new HashSet<>();
    
    @Column(unique=true, nullable=false)
    @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
        +"[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"
        +"(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
             message="Not a valid input")
    private String email;

    private String firstName;
    private String surName;
    private String profilePicture;
    //@JsonIgnore
    private String password;
    @Size( min=8 )
    private String telephone;
    
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(nullable=true/*, columnDefinition="mediumblob"*/)
    private byte[] image;
    
    protected User(){
        
    }
    
    /**
     * @return the userbook
     */
    public Set<BookOfUser> getUserbook() {
        return userbook;
    }

    /**
     * @param userbook the userbook to set
     */
    public void setUserbook(Set<BookOfUser> userbook) {
        this.userbook = userbook;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName the firstName to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return the surName
     */
    public String getSurName() {
        return surName;
    }

    /**
     * @param surName the surName to set
     */
    public void setSurName(String surName) {
        this.surName = surName;
    }

    /**
     * @return the profilePicture
     */
    public String getProfilePicture() {
        return profilePicture;
    }

    /**
     * @param profilePicture the profilePicture to set
     */
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    /**
     * @return the telephone
     */
    public String getTelephone() {
        return telephone;
    }

    /**
     * @param telephone the telephone to set
     */
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    /**
     * @return the user
     */
    public Set<UserFriend> getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(Set<UserFriend> user) {
        this.user = user;
    }

    /**
     * @return the friend
     */
    public Set<UserFriend> getFriend() {
        return friend;
    }

    /**
     * @param friend the friend to set
     */
    public void setFriend(Set<UserFriend> friend) {
        this.friend = friend;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

}
