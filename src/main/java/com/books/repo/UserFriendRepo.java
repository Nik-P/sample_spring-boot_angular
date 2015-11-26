/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.books.repo;

import com.books.entity.User;
import com.books.entity.UserFriend;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author nik
 */
@Transactional
public interface UserFriendRepo extends PagingAndSortingRepository<UserFriend, Long> {

    //@Query("select u from #{#entityName} u where u.user.id = ?1 or u.friend.id = ?2")
    //Optional<UserFriend> findByUserIdOrFriendId(@Param("userid") Long uId, @Param("friendid") String fId);
    
    Optional<UserFriend> findByUserIdAndFriendId(@Param("userid") Long uId, @Param("friendid") Long fId);
    
    List<User> findByUserId(@Param("id") Long id);
    
    List<User> findByFriendId(@Param("id") Long id);

}
