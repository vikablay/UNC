package com.example.demo.controller;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @GetMapping("image/{id}")
    @ResponseBody
    public void getImage(@PathVariable("id") Long id,
                         HttpServletResponse response) throws IOException {
        Book book = bookService.findById(id);
        response.getOutputStream().write(book.getImage());
        response.getOutputStream().close();
    }

    @PostMapping("saveBook")
    @ResponseBody
    public ResponseEntity<String> saveBook(@RequestParam String name,
                                           @RequestParam String authorFirstName,
                                           @RequestParam(name="image",required = false) MultipartFile image,
                                           @RequestParam(required = false) String description) throws IOException {
        bookService.save(new Book(name, image.getBytes(), new Author(authorFirstName)));
        return ResponseEntity.ok("Book saved");
    }
    /*@PostMapping("saveBook")
    @ResponseBody
    public ResponseEntity<String> saveBook(@RequestBody Book book) throws IOException {
        bookService.save(book);
        return ResponseEntity.ok("Book saved");
    }*/

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
