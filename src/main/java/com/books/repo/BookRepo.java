package com.books.repo;

import java.util.List;
import com.books.entity.Book;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;


//@RepositoryRestResource(collectionResourceRel = "books", path = "books")
@Transactional
public interface BookRepo extends PagingAndSortingRepository<Book, Long> {

    Optional<Book> findById(@Param("id") Long id);
    
    @Query("SELECT b FROM Book b "
        + "INNER JOIN b.userbook ub WHERE ub.user in "
        + "(SELECT friendship.user FROM UserFriend friendship "
        + "INNER JOIN friendship.friend fr  WHERE fr.id = :id) ")
    List<Book> findByUserFriends(@Param("id") Long id);
    
    @Query("SELECT b FROM Book b "
        + "INNER JOIN b.userbook ub WHERE ub.user in "
        + "(SELECT friendship.user FROM UserFriend friendship "
        + "INNER JOIN friendship.friend fr  WHERE fr.id = :id) ")
    Page<Book> findByUserFriends(Pageable p ,@Param("id") Long id);


    @Query("SELECT ub FROM BookOfUser ub "
        + "WHERE ub.availability > 0 AND ub.user in "
        + "(SELECT friendship.user FROM UserFriend friendship "
        + "INNER JOIN friendship.friend fr  WHERE fr.id = :id) ")
    List<Object[]> findByUserFriendsWithAvailability(@Param("id") Long id);
   
    @Query("SELECT ub FROM BookOfUser ub "
        + "WHERE ub.availability > 0 AND ub.user in "
        + "(SELECT friendship.user FROM UserFriend friendship "
        + "INNER JOIN friendship.friend fr  WHERE fr.id = :id) ")
    Page<Object[]> findByUserFriendsWithAvailability(Pageable p ,@Param("id") Long id);
    
    @Query("SELECT b FROM Book b "
        + "INNER JOIN b.userbook ub WHERE ub.user.id = :id")
    List<Book> findByUserBookOwnerId(@Param("id") Long id);
    
    List<Book> findByTitle(@Param("title") String title);

    List<Book> findByTitleOrAuthor(@Param("title") String title, @Param("author") String author);
}