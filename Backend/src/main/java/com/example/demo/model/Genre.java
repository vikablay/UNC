package com.example.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String name;

    @ManyToMany
    private List<Book> books;

    {
        books = new LinkedList<>();
    }
}
