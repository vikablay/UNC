package com.example.demo.service;

import com.example.demo.model.Author;
import com.example.demo.model.Book;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public void save(Book book) {
        bookRepository.save(book);
    }

    public Book findByName(String name) {
        return bookRepository.findByName(name);
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
}
