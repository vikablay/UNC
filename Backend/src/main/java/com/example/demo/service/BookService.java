package com.example.demo.service;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        List<Book> books = bookRepository.findAll();
        books.sort((d1, d2) -> (int) (d1.getId() - d2.getId()));
        return books;
    }

    public void save(Book book) {
        bookRepository.save(book);
    }

    public void save(Book book, Author author) {
        author.addBook(book);
        bookRepository.save(book);
    }

    @Transactional
    public Book findByName(String name) {
        return bookRepository.findByName(name);
    }

    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }

    public void updateName(Book bookUpdate) {
        bookRepository.findById(bookUpdate.getId()).ifPresent(book -> {
            book.setName(bookUpdate.getName());
            book.setDescription(bookUpdate.getDescription());
            book.setImage(bookUpdate.getImage());
            List<Author> auths = bookUpdate.getAuthors();
            for (Author au : auths) {
                au.addBook(bookUpdate);
            }
            List<Author> authors = book.getAuthors();
            for (int i = 0; i < auths.size(); i++) {
                authors.get(i).setFirstName(auths.get(i).getFirstName());
                authors.get(i).setLastName(auths.get(i).getLastName());
                authors.get(i).setBooks(auths.get(i).getBooks());
            }
            bookRepository.save(book);
        });
    }

    public List<Book> findByAuthor(Author author) {
        return bookRepository.findByAuthors(author);
    }

    public List<Book> findByAuthor(String author) {
        String[] str = author.split(" ");
        return authorRepository.findByFirstNameContainingOrLastNameContaining(author, author).getBooks();
        // return authorRepository.findByFirstName(author).getBooks();

    }

    @Transactional
    public List<Book> findByAverageRatingBetween(double from, double to) {
        return bookRepository.findByAverageRatingBetween(from, to);
    }

    public void saveAll(List<Book> users) {
        bookRepository.saveAll(users);
    }

    public void updateAverageRating(Long id, Long newRatingMark) {
        bookRepository.findById(id).ifPresent(book -> {
            book.updateAverageRating(newRatingMark);
            bookRepository.save(book);
        });
    }

    @Transactional
    public List<Book> findLike(String partOfSome) {
        return bookRepository.findAllByNameContainingOrDescriptionContaining(partOfSome, partOfSome);
    }

    public List<Book> sortBooksOfRating() {
        return bookRepository.findAll(Sort.by("averageRating"));
    }

    public List<Book> sortBooksOfAuthor() {
        return bookRepository.findAll(Sort.by("authors"));
    }
}
