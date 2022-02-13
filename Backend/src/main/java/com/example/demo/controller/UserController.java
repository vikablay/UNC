package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping("/user/addPurchased")
    public ResponseEntity<Optional<User>> addPurchasedBookToUser(@RequestParam Long bookId, @RequestParam Long userId) {
        Optional<User> user = userService.addPurchasedBookToUser(bookId, userId);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.badRequest().body(user);
        }
    }

    @PostMapping("/user/addRated")
    public ResponseEntity<Optional<User>> addRatedBookToUser(@RequestParam Long bookId, @RequestParam Long userId) {
        Optional<User> user = userService.addRatedBookToUser(bookId, userId);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.badRequest().body(user);
        }
    }
}
