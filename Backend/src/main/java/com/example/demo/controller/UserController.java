package com.example.demo.controller;

import com.example.demo.entity.Book;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String userName) {
        return ResponseEntity.ok().body(userService.getUser(userName));
    }

    @PostMapping("/user/addPurchased")
    public ResponseEntity<Optional<User>> addPurchasedBookToUser(@RequestParam Long bookId, @RequestParam String userName) {
        Optional<User> user = userService.addPurchasedBookToUser(bookId, userName);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.badRequest().body(user);
        }
    }

    @PostMapping("/user/addRated")
    public ResponseEntity<User> addRatedBookToUser(@RequestParam Long bookId, @RequestParam String userName) {
        Optional<User> user = userService.addRatedBookToUser(bookId, userName);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        } else {
            return ResponseEntity.badRequest().body(user.get());
        }
    }
}
