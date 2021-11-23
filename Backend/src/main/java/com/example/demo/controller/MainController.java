package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MainController {

    private final BookService bookService;

    @Autowired
    public MainController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("books")
    public List<Book> getBooks(Model model) {
        return bookService.findAll();
    }

    @PostMapping("saveBook")
    public void saveBook(@RequestParam String name,
                         @RequestParam String author,
                         @RequestParam(required = false) String description) {
        bookService.save(new Book(name, author));
    }

}
