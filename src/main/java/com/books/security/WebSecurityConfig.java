/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


/**
 *
 * @author nik
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   
    @Autowired
    private AuthSuccess authSuccess;
    
    @Autowired
    private AuthFailure authFailure;
   
    @Autowired
    private UserDetailServiceImpl userDetailService;
    
    
    /*public WebSecurityConfig(AuthSuccess authSuccess,
                            AuthFailure authFailure,
                            UserDetailServiceImpl userDetailService){
        this.authSuccess = authSuccess;
        this.authFailure = authFailure;
        this.userDetailService = userDetailService;
    }*/
    
    /*@Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
                .withUser("user").password("password").roles("USER");
    }*/
    
    @Autowired
    public void configAuthBuilder(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userDetailService);
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            /*.exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler)
            .and()*/
            .formLogin()
                .successHandler(authSuccess)
                .failureHandler(authFailure)
            .and()
            .authorizeRequests()
                .antMatchers("/**")
                    .permitAll();
        
        /*http
          .httpBasic()
        .and()
          .authorizeRequests()
            .antMatchers("/index.html", "/home.html", "/login.html", "/", "/js/**\/*","/css/**\/*", "frontDependencies/**\/*").permitAll()
            .anyRequest().authenticated();*/
        
        /*http
            .authorizeRequests()
                .antMatchers("/", "/home", "/js/**\/*","/css/**\/*", "frontDependencies/**\/*").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .logout()
                .permitAll();*/
    }
}
