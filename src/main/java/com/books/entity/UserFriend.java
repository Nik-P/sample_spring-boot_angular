/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.entity;

import com.books.entity.helpers.StartEntity;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import org.hibernate.annotations.NaturalId;

/**
 *
 * @author nik
 */
@Entity
public class UserFriend extends StartEntity  {
    //@JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @NaturalId
    private User user;
    
    //@JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @NaturalId
    private User friend;
    
    private boolean accepted;
    private Date approvalDate;
    private int followFriend;
    
    protected UserFriend(){
        
    }
    
    public UserFriend(User user, User friend, UserFriend info) {
        this.user = user;
        this.friend = friend;
        this.followFriend = info.getFollowFriend();
        this.approvalDate = info.getApprovalDate();
        this.accepted = info.isAccepted();
    }

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
     * @return the friend
     */
    public User getFriend() {
        return friend;
    }

    /**
     * @param friend the friend to set
     */
    public void setFriend(User friend) {
        this.friend = friend;
    }

    /**
     * @return the approvalDate
     */
    public Date getApprovalDate() {
        return approvalDate;
    }

    /**
     * @param approvalDate the approvalDate to set
     */
    public void setApprovalDate(Date approvalDate) {
        this.approvalDate = approvalDate;
    }

    /**
     * @return the followFriend
     */
    public int getFollowFriend() {
        return followFriend;
    }

    /**
     * @param followFriend the followFriend to set
     */
    public void setFollowFriend(int followFriend) {
        this.followFriend = followFriend;
    }

    /**
     * @return the accepted
     */
    public boolean isAccepted() {
        return accepted;
    }

    /**
     * @param accepted the accepted to set
     */
    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
