package com.example.demo.repository;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Book findByName(String name);

    List<Book> findByAuthors(Author authors);

    List<Book> findByAverageRatingBetween(double to, double from);
}
