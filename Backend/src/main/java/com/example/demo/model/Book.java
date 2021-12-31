package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String name;

    @ManyToMany(cascade = {CascadeType.PERSIST})
    private List<Author> authors;

    private double averageRating;

    @ManyToMany(cascade = {CascadeType.PERSIST})
    private List<Genre> genres;

    {
        genres = new LinkedList<>();
        authors = new LinkedList<>();
    }

    public Book(String name, Author author) {
        this.name = name;
        authors = new LinkedList<>();
        authors.add(author);
    }

    public void addAuthor(Author author) {
        authors.add(author);
    }


}
