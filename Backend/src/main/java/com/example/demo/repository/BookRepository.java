package com.example.demo.repository;

import com.example.demo.model.Author;
import com.example.demo.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByName(String name);

    Book findById(int id);

    List<Book> findByAuthors(Author authors);

    List<Book> findByAverageRatingBetween(double to, double from);
}
