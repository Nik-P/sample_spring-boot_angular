package com.books.repo;

import com.books.entity.BookOfUser;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;


//@RepositoryRestResource(collectionResourceRel = "books", path = "books")
@Transactional
public interface BookOfUserRepo extends PagingAndSortingRepository<BookOfUser, Long> {

    Optional<BookOfUser> findById(@Param("id") Long id);
    
    List<BookOfUser> findByUserEmail(@Param("email") String email);
    
    List<BookOfUser> findByUserId(@Param("id") Long id);
    
    Optional<BookOfUser> findByUserIdAndBookId(@Param("id") Long id, @Param("bId") Long bId);
    
    List<BookOfUser> findByBookTitle(@Param("title") String title);

    List<BookOfUser> findByUserEmailOrBookTitle(@Param("email") String email, @Param("title") String title);
}