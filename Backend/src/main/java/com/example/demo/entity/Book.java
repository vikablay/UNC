package com.example.demo.entity;

import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.File;
import java.io.IOException;
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

    public Book(String name, byte[] image, String authorName) {
        this.name = name;
        this.image = image;
        this.addAuthor(authorName);
    }
    public Book(String name, String authorName) {
        this.name = name;
        this.addAuthor(authorName);
    }

    public void addAuthor(String authorName) {
        String[] names = authorName.split(" ");
        Author author=new Author(names[0],names[1]);
        author.addBook(this);
        authors.add(author);
    }

    public void addGenre(Genre genre) {
        genre.addBook(this);
        genres.add(genre);
    }

}
