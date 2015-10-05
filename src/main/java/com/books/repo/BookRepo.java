package com.books.repo;

import java.util.List;
import com.books.entity.Book;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "books", path = "books")
public interface BookRepo extends PagingAndSortingRepository<Book, Long> {

    List<Book> findByTitle(@Param("title") String title);

    List<Book> findByTitleOrAuthor(@Param("title") String title, @Param("author") String author);
}