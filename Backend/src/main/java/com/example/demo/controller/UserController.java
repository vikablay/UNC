package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String userName) {
        return ResponseEntity.ok().body(userService.getUser(userName));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok().body(userService.findAll());
    }

    @DeleteMapping("/user")
    public ResponseEntity<Object> deleteUserById(@RequestParam String id) {
        userService.deleteById(Long.valueOf(id));
        return ResponseEntity.ok().body("Ok");
    }

    @PostMapping("/user/addPurchased")
    public ResponseEntity<User> addPurchasedBookToUser(@RequestParam Long bookId, @RequestParam String userName) {
        User user = userService.addPurchasedBookToUser(bookId, userName);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/user/addRated")
    public ResponseEntity<User> addRatedBookToUser(@RequestParam Long bookId, @RequestParam String userName) {
        User user = userService.addRatedBookToUser(bookId, userName);
        return ResponseEntity.ok().body(user);
    }
}
