import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {Router} from "@angular/router";
import {deserialize,deserializeArray} from "class-transformer";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  rating: number;

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getBooks().subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
      console.log(this.books);
      /*for (let au in this.books.au) {
        console.log(this.book.authors[au]);
      }*/
    });
  }

  changeRating(rating: number,id: number) {
    this.rating = rating;
    console.log(id, this.rating);
    let resp = this.service.updateBookRating(this.rating, id);
    resp.subscribe(data => {
      for(let b in this.books) {
        if(this.books[b].id==id)
          this.books[b].averageRating = deserialize(Book, data.averageRating.toString()).averageRating;
      }
      console.log("DATA:  " + data)});
  }

  toDetails(name: string): void {
    this.router.navigate(['/details', name]);
  }
}
