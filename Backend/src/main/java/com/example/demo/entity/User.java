package com.example.demo.entity;

import com.example.demo.dto.NewUserDTO;
import lombok.*;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.EAGER;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String username;

    private String password;

    private String email;

    @ManyToMany
    private List<Role> roles = new ArrayList<>();

    @ManyToMany
    private List<Book> ratedBooks = new ArrayList<>();

    @ManyToMany
    private List<Book> purchasedBooks = new ArrayList<>();

    public User(Long id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public User(NewUserDTO userDTO) {
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
        this.email = userDTO.getEmail();
    }
}
