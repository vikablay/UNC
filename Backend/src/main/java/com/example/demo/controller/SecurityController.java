package com.example.demo.controller;

import com.example.demo.dto.NewUserDTO;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SecurityController {

    private final UserService userService;

    @Autowired
    public SecurityController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test")
    public String welcome() {
        return "Test message";
    }

    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody NewUserDTO newUserDTO) {
        if (userService.findByUsername(newUserDTO.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        } else {
            userService.saveUser(new User(newUserDTO));
            Arrays.stream(newUserDTO.getRoles()).forEach(
                    role -> userService.addRoleToUser(newUserDTO.getUsername(), role));
            return ResponseEntity.status(HttpStatus.CREATED).body("User created");
        }
    }

}
