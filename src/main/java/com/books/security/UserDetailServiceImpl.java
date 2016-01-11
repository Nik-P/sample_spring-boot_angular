/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.security;

import com.books.entity.User;
import com.books.exceptions.UserNotFoundException;
import com.books.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 *
 * @author nik
 */
public class UserDetailServiceImpl implements UserDetailsService{
    
    private UserRepo userRepo;
    
    @Autowired
    public UserDetailServiceImpl(UserRepo userRepo){
        this.userRepo = userRepo;
    }
    
    @Override
    public UserDetails loadUserByUsername(String name) throws UserNotFoundException {
        User account = userRepo.findByEmail(name).get();
        if(account == null) {
            throw new UserNotFoundException(null);
        }
        return new AccountUserDetails(account);
    }
}
