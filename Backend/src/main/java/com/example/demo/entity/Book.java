package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
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

    @ToString.Exclude
    @ManyToMany(mappedBy = "books", cascade = CascadeType.PERSIST)
    private List<Author> authors = new ArrayList<>();
    private Long sumRatingMarks = 0L;
    private int ratingsQuantity = 0;
    private double averageRating = 0;
    @ToString.Exclude
    @ManyToMany(mappedBy = "books", cascade = CascadeType.PERSIST)
    private List<Genre> genres = new ArrayList<>();

    @Lob
    private String image;

    public Book(String name, String image, Author author) {
        this.name = name;
        this.image = image;
        addAuthor(author);
    }

    public Book(String name, String image, Author author, String description) {
        this.name = name;
        this.image = image;
        this.description = description;
        addAuthor(author);
    }

    public Book(String name, Author author) {
        this.name = name;
        addAuthor(author);
    }


    public void addAuthor(Author author) {
        author.addBook(this);
        authors.add(author);
    }

    public void addGenre(Genre genre) {
        genre.addBook(this);
        genres.add(genre);
    }

    public void updateAverageRating(int newRatingMark) {
        ratingsQuantity += 1;
        sumRatingMarks += newRatingMark;
        averageRating = (double) sumRatingMarks / ratingsQuantity;
    }

}
