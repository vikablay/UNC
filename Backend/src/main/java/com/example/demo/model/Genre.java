package com.example.demo.model;

public enum Genre {
    CLASSIC("Classic"),
    THRILLER("Thriller"),
    HORROR("Horror");

    public String genre;

    public String getGenre() {
        return genre;
    }

    Genre(String genre) {
        this.genre = genre;
    }
}
