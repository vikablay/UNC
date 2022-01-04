package com.example.demo.controller;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MainController {

    private final BookService bookService;

    @GetMapping("books")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(bookService.findAll());
    }

    @PostMapping("saveBook")
    public ResponseEntity<String> saveBook(@RequestParam String name,
                                           @RequestParam String authorFirstName,
                                           @RequestParam(required = false) String description) {
        bookService.save(new Book(name, new Author(authorFirstName)));
        return ResponseEntity.ok("Book saved");
    }

    @DeleteMapping("deleteBook")
    public void deleteBook(@RequestParam Long id) {
        bookService.delete(id);
    }


    @PostMapping("updateBook")
    public void updateBook(@RequestParam Long id,
                           @RequestParam String name,
                           @RequestParam(required = false) String description) {
        bookService.update(id, name);
    }

    @GetMapping("booksOfAuthor")
    public List<Book> getBooksOfAuthors(@RequestParam String authorFirstName) {
        return bookService.findByAuthorFirstName(authorFirstName);
    }

    @GetMapping("book")
    public Book getBook(@RequestParam String name) {
        return bookService.findByName(name);
    }

    @GetMapping("booksAverageRating")
    public List<Book> getBooks(@RequestParam double to,
                               @RequestParam double from) {
        return bookService.findByAverageRatingBetween(to, from);
    }


}
