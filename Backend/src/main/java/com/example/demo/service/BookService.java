package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public void save(Book book) {
        bookRepository.save(book);
    }

    public Book findByName(String name) {
        return bookRepository.findByName(name);
    }

    public void delete(int id) {
        bookRepository.deleteById(id);

    }

    public void update(int id,String name, String author ) {
        Book book = bookRepository.findById(id);
        if(book!=null)
        {
            book.setName(name);
            book.setAuthor(author);
        }
        bookRepository.save(book);
    }


    public List<Book> findByAuthor(String author)
    {
        List<Book> books=bookRepository.findAll();
        List<Book> result=new ArrayList<Book>();
        for(int i=0;i<books.size();i++)
        {
            if(books.get(i).getAuthor().equals(author))
                result.add(books.get(i));
        }
        return result;
    }
}
