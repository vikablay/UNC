package com.example.demo.service;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    @Autowired
    public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public void save(Book book) {
        bookRepository.save(book);
    }

    public void save(Book book, Author author) {
        author.addBook(book);
        bookRepository.save(book);
    }

    public Book findByName(String name) {
        return bookRepository.findByName(name);
    }


    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        bookRepository.deleteById(id);

    }

    public void update(Long id, String name) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            book.setName(name);
            bookRepository.save(book);
        }
    }

    public List<Book> findByAuthor(Author author) {
        return bookRepository.findByAuthors(author);
    }

    public List<Book> findByAuthorFirstName(String authorFirstName) {
        return authorRepository.findByFirstName(authorFirstName).getBooks();

    }

    public List<Book> findByAverageRatingBetween(double to, double from) {
        return bookRepository.findByAverageRatingBetween(to, from);
    }

    public void saveAll(List<Book> users) {
        bookRepository.saveAll(users);
    }
}
