package com.example.demo.controller;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("books")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(bookService.findAll());
    }

    @PostMapping("saveBook")
    @ResponseBody
    public void saveBook(@RequestBody Book book) {
        List<Author> auths = book.getAuthors();
        bookService.save(book, auths.get(0));
    }


    @DeleteMapping("deleteBook")
    public void deleteBook(@RequestParam Long id) {
        bookService.delete(id);
    }

    @PostMapping("updateBook")
    @ResponseBody
    public void updateBook(@RequestBody Book book) {
        bookService.updateName(book);
    }

    @GetMapping("booksOfAuthor")
    public List<Book> getBooksOfAuthors(@RequestParam String authorFirstName) {
        return bookService.findByAuthorFirstName(authorFirstName);
    }

    @GetMapping("book")
    @Transactional
    public Book getBook(@RequestParam String name) {
        return bookService.findByName(name);
    }

    @GetMapping("booksAverageRating")
    public List<Book> getBooks(@RequestParam double to,
                               @RequestParam double from) {
        return bookService.findByAverageRatingBetween(to, from);
    }

    @PostMapping("updateBookRating")
    public Book updateBookRating(@RequestParam Long id,
                                 @RequestParam Long rating) {
        bookService.updateAverageRating(id, rating);
        return bookService.findById(id);
    }


}
