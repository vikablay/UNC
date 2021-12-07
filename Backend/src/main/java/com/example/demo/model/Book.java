package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    //TODO move authors to the table
    private String author;

    private double averageRating;

    //TODO move genres to the table
    //private List<Genre> genres;

    public Book(String name, String author) {
        this.name = name;
        this.author = author;
        this.averageRating = 0;
    }
}
