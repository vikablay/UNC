package com.example.demo;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.service.BookService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
@RequiredArgsConstructor
public class BackendApp {
    private final UserService userService;
    private final BookService bookService;

    @PostConstruct
    public void initUsersAndRolesData() {
        userService.saveUser(new User(null, "user1", "pass1", "user1@email.com"));
        userService.saveUser(new User(null, "user2", "pass2", "user2@email.com"));

        userService.saveRole(new Role(null, "ROLE_CUSTOMER"));
        userService.saveRole(new Role(null, "ROLE_ADMIN"));

        userService.addRoleToUser("user1", "ROLE_ADMIN");
        userService.addRoleToUser("user2", "ROLE_CUSTOMER");
    }

    @PostConstruct
    public void initBooksData() {
        bookService.save(new Book("War and Peace", new Author("Lev", "Tolstoy")));
        bookService.save(new Book("Crime and Punishment", new Author("Fedor", "Dostoevsky")));
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApp.class, args);
    }

}
