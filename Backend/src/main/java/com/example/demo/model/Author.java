package com.example.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String firstName;

    private String lastName;

    @ManyToMany(cascade = {CascadeType.PERSIST})
    private List<Book> books;

    {
        books = new LinkedList<>();
    }

    public Author(String firstName) {
        this.firstName = firstName;
    }
}
