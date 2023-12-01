package com.example.demo;

import com.example.demo.entity.Author;
import com.example.demo.entity.Book;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.service.BookService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

@Component
public class DatabaseInitializer implements ApplicationRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        userService.saveUser(new User(null, "user1", "pass1", "user1@email.com"));
        userService.saveUser(new User(null, "user2", "pass2", "user2@email.com"));

        userService.saveRole(new Role(null, "ROLE_CUSTOMER"));
        userService.saveRole(new Role(null, "ROLE_ADMIN"));

        userService.addRoleToUser("user1", "ROLE_ADMIN");
        userService.addRoleToUser("user2", "ROLE_CUSTOMER");

        bookService.save(new Book("Война и мир",
                Base64.getEncoder().encodeToString(getImg("/images/warAndPeace.jpg")),
                new Author("Лев", "Толстой"),
                "«Война и мир» – одно из высших достижений художественного гения\n" +
                        "Л.Н. Толстого. Книга потребовала от писателя громадных усилий."));
        bookService.save(new Book("Преступление и наказание",
                Base64.getEncoder().encodeToString(getImg("/images/crimeAndPunishment.jpg")),
                new Author("Федор", "Достоевский")));
        bookService.save(new Book("Вишневый сад",
                Base64.getEncoder().encodeToString(getImg("/images/cherryOrchard.jpg")),
                new Author("Антон", "Чехов")));
        bookService.save(new Book("Отцы и дети",
                Base64.getEncoder().encodeToString(getImg("/images/otsyideti.jpg")),
                new Author("Иван", "Тургенев")));
    }

    private byte[] getImg(String name) {
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
