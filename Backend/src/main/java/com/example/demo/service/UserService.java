package com.example.demo.service;

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

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final BookRepository bookRepository;

    @Transactional
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    @Transactional
    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
        userRepository.save(user);
    }

    @Transactional
    public User addPurchasedBookToUser(Long bookId, String userName) {
        User user = userRepository.findByUsername(userName);
        bookRepository.findById(bookId).ifPresent(book -> user.getPurchasedBooks().add(book));
        return userRepository.save(user);
    }

    @Transactional
    public User addRatedBookToUser(Long bookId, String userName) {
        User user = userRepository.findByUsername(userName);
        bookRepository.findById(bookId).ifPresent(book -> user.getRatedBooks().add(book));
        return userRepository.save(user);
    }

    @Transactional
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public User getUser(String userName) {
        return userRepository.findByUsername(userName);
    }

    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
