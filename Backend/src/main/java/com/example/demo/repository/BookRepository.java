package com.example.demo.repository;

import com.example.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Book findByName(String name);

    List<Book> findAllByNameContainingOrDescriptionContaining(String partOfSome1, String partOfSome2);

}
