package com.example.demo.service;

import com.example.demo.model.Author;
import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public void save(Book book) {
        bookRepository.save(book);
    }

    public Book findByName(String name) {
        return bookRepository.findByName(name);
    }

    public void delete(int id) {
        bookRepository.deleteById(id);

    }

    public void update(int id, String name) {
        Book book = bookRepository.findById(id);
        if (book != null) {
            book.setName(name);
            bookRepository.save(book);
        }
    }


    public List<Book> findByAuthor(String author) {
        return bookRepository.findByAuthor(author);
    }

    public List<Book> findByAverageRatingBetween(double to, double from) {
        return bookRepository.findByAverageRatingBetween(to, from);
    }
}
