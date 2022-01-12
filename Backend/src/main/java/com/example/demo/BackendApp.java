package com.example.demo;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.service.BookService;
import com.example.demo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
public class BackendApp {

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApp.class, args);
    }

    @Bean
    CommandLineRunner run(UserService userService, BookService bookService) {
        return args -> {
            userService.saveUser(new User(null, "user1", "pass1", "user1@email.com"));
            userService.saveUser(new User(null, "user2", "pass2", "user2@email.com"));

            userService.saveRole(new Role(null, "ROLE_CUSTOMER"));
            userService.saveRole(new Role(null, "ROLE_ADMIN"));

            userService.addRoleToUser("user1", "ROLE_ADMIN");
            userService.addRoleToUser("user2", "ROLE_CUSTOMER");


            bookService.save(new Book("War and Peace",getImg("/images/warAndPeace.jpg"), new Author("Lev", "Tolstoy")));
           bookService.save(new Book("Crime and Punishment", getImg("/images/crimeAndPunishment.jpg"),new Author("Fedor", "Dostoevsky")));
        };
    }

    private byte[] getImg(String name)
    {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try (InputStream in = getClass().getResourceAsStream(name)) {
            int length;
            byte[] buffer = new byte[1024];
            while ((length = in.read(buffer)) != -1)
                out.write(buffer, 0, length);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }
}
