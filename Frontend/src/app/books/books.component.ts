import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {Router} from "@angular/router";
import {deserializeArray} from "class-transformer";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  public ImgUrl = ' ';

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getBooks().subscribe(data => {
      this.books = deserializeArray(Book, <string>data.body);
      for (var book in this.books) {
        this.ImgUrl = 'data:image/png;base64,' + this.books[book].image;
        console.log(this.books[book].image);
        for (var author in this.books[book].authors)
          console.log(this.books[book].authors[author].firstName);
      }
    });
  }

  toDetails(name: string): void {
    this.router.navigate(['/details', name]);
  }
}
