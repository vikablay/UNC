package com.example.demo;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.entity.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class BackendApp {

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    @Autowired
    public BackendApp(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void initUsers() {
        List<User> users = Stream.of(
                new User(1L, "user1", "pass1", "user1@email.com"),
                new User(2L, "user2", "pass2", "user2@email.com"),
                new User(3L, "user3", "pass3", "user3@email.com")
        ).collect(Collectors.toList());
        userRepository.saveAll(users);
    }

    @PostConstruct
    public void initBooks() {
        List<Book> users = Stream.of(
                new Book("War and Peace", new Author("Lev", "Tolstoy")),
                new Book("Crime and Punishment", new Author("Fedor", "Dostoevsky"))
        ).collect(Collectors.toList());
        bookRepository.saveAll(users);
    }


    public static void main(String[] args) {
        SpringApplication.run(BackendApp.class, args);
    }

}
