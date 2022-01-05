package com.example.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String firstName;

    private String lastName;

    @ManyToMany(cascade = {CascadeType.PERSIST})
//    @JoinTable(name = "books_authors",
//            joinColumns = @JoinColumn(name = "author_id"),
//            inverseJoinColumns = @JoinColumn(name = "book_id"))
    private List<Book> books;

    {
        books = new LinkedList<>();
    }

    public Author(String firstName) {
        this.firstName = firstName;
    }
}
