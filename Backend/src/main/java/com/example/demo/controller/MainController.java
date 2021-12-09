package com.example.demo.controller;

import com.example.demo.model.Author;
import com.example.demo.model.Book;
import com.example.demo.service.AuthorService;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {

    private final BookService bookService;

    private final AuthorService authorService;

    @GetMapping("books")
    public ResponseEntity<List<Book>> getBooks(Model model) {
        return ResponseEntity.ok(bookService.findAll());
    }

    @PostMapping("saveBook")
    public ResponseEntity<String> saveBook(@RequestParam String name,
                                           @RequestBody List<String> authors,
                                           @RequestParam(required = false) String description) {
        List<Author> author=new ArrayList<>();
        for(String s: authors)
        {
            if(!authorService.existsByName(s))
                authorService.save(new Author(s));
        }
        Book book = new Book(name);
        book.setAuthors(author);
        bookService.save(book);
        return ResponseEntity.ok("Book saved");
    }

    @DeleteMapping("deleteBook")
    public void deleteBook(@RequestParam int id) {
        bookService.delete(id);
    }


    @PostMapping("updateBook")
    public void updateBook(@RequestParam int id,
                           @RequestParam String name,
                           @RequestParam(required = false) String description) {
        bookService.update(id, name);
    }

    @GetMapping("booksOfAuthor")
    public List<Book> getBooksOfAuthors(@RequestParam String author) {
        return bookService.findByAuthor(author);
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
