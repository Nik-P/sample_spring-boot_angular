package com.books.repo;

import java.util.List;
import com.books.entity.Book;
import com.books.entity.User;
import java.util.Optional;
import javax.transaction.Transactional;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;


//@RepositoryRestResource(collectionResourceRel = "books", path = "books")
@Transactional
public interface UserRepo extends PagingAndSortingRepository<User, Long> {

    Optional<User> findByEmail(@Param("email") String email);
    
    Optional<User> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
    
    Optional<User> findById(@Param("id") Long id);

}