package com.example.demo.entity;

import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "books", cascade = CascadeType.PERSIST)
    private List<Author> authors = new ArrayList<>();

    private double averageRating;

    @ManyToMany(mappedBy = "books", cascade = CascadeType.PERSIST)
    private List<Genre> genres = new ArrayList<>();

    @Lob
    private byte[] image;

    public Book(String name, byte[] image, Author author) {
        this.name = name;
        this.image = image;
        this.addAuthor(author);
    }

    public void addAuthor(Author author) {
        author.addBook(this);
        authors.add(author);
    }

    public void addGenre(Genre genre) {
        genre.addBook(this);
        genres.add(genre);
    }

}
