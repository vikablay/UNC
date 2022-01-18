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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class BackendApp {
    private static final String[] ALLOWED_CORS_SOURCES =
            {
                    "http://localhost:4200",
                    "http://localhost:4210"
            };

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins(ALLOWED_CORS_SOURCES);
            }
        };
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

            bookService.save(new Book("War and Peace", new Author("Lev", "Tolstoy")));
            bookService.save(new Book("Crime and Punishment", new Author("Fedor", "Dostoevsky")));
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApp.class, args);
    }
}
