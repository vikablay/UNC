import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {Router} from "@angular/router";
import {deserialize, deserializeArray} from "class-transformer";
import {NewUser} from "../entity/NewUser";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  rating: number;
  thanks: string;

  from: number;
  to: number;

  author: string;

  search:string;

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getBooks().subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
      console.log(this.books);
    });
  }

  changeRating(rating: number, id: number) {
    this.rating = rating;
    console.log(id, this.rating);
    let resp = this.service.updateBookRating(this.rating, id);
    resp.subscribe(data => {
      for (let b in this.books) {
        if (this.books[b].id == id)
          this.books[b].averageRating = deserialize(Book, data.averageRating.toString()).averageRating;
      }
      console.log("DATA:  " + data)
    });
  }

  chooseRating() {
    console.log(this.from, this.to);
    this.service.getBooksAverageRating(this.from, this.to).subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
      console.log(this.books);
    });
  }

  findBooksOfAuthor(){
    console.log(this.author);
    this.service.getBooksOfAuthor(this.author).subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
      console.log(this.books);
    });
  }

  searchBooks(){
    console.log(this.search);
    this.service.getBooksOfSearch(this.search).subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
      console.log(this.search);
    });
  }

  sortBooksOfRating(){
    this.service.getSortedBooksOfRating().subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
    });
  }

  sortBooksOfAuthor(){
    this.service.getSortedBooksOfAuthor().subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
    });
  }

  toDetails(name: string): void {
    this.router.navigate(['/details', name]);
  }
}
