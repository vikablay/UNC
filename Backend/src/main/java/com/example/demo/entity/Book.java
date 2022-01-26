package com.example.demo.entity;

import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
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
    private String description;

    @ManyToMany(mappedBy = "books", cascade = CascadeType.PERSIST)
    private List<Author> authors = new ArrayList<>();

    private Long sumRatingMarks = 0L;
    private int ratingsQuantity = 0;
    private double averageRating = 0;

    @ManyToMany(mappedBy = "books", cascade = CascadeType.PERSIST)
    private List<Genre> genres = new ArrayList<>();

    @Lob
    private byte[] image;

    public Book(String name, byte[] image, Author author) {
        this.name = name;
        this.image = image;
        this.addAuthor(author);
    }

    public Book(String name, byte[] image, Author author, String description) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.addAuthor(author);
    }

    public Book(String name, Author author) {
        this.name = name;
        this.addAuthor(author);
    }


    public void addAuthor(Author author) {
        author.addBook(this);
        this.authors.add(author);
    }

    public void addGenre(Genre genre) {
        genre.addBook(this);
        this.genres.add(genre);
    }

    public void updateAverageRating(int newRatingMark) {
        this.ratingsQuantity += 1;
        this.sumRatingMarks += newRatingMark;
        this.averageRating = (double) this.sumRatingMarks / this.ratingsQuantity;
    }

}
