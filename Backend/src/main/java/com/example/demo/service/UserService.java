package com.example.demo.service;

import com.example.demo.entity.Book;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final BookRepository bookRepository;

    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
        userRepository.save(user);
    }

    @Transactional
    public Optional<User> addPurchasedBookToUser(Long bookId, String userName) {
//        User opUser = userRepository.findByUsername(userName);
//        Book book = bookRepository.findById(bookId);
//        opUser.ifPresent(user -> {
//            bookRepository.findById(bookId).ifPresent(book -> user.getPurchasedBooks().add(book));
//            userRepository.save(user);
//        });
//        return opUser;
        userRepository.findById(userRepository.findByUsername(userName).getId()).ifPresent(user -> {
            bookRepository.findById(bookId).ifPresent(book -> user.getPurchasedBooks().add(book));
            userRepository.save(user);
        });
        return userRepository.findById(userRepository.findByUsername(userName).getId());
    }

    @Transactional
    public Optional<User> addRatedBookToUser(Long bookId, String userName) {
        userRepository.findById(userRepository.findByUsername(userName).getId()).ifPresent(user -> {
            bookRepository.findById(bookId).ifPresent(book -> user.getRatedBooks().add(book));
            userRepository.save(user);
        });
        return userRepository.findById(userRepository.findByUsername(userName).getId());
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User getUser(String userName) {
        return userRepository.findByUsername(userName);
    }

    public void saveAll(List<User> users) {
        userRepository.saveAll(users);
    }

}
