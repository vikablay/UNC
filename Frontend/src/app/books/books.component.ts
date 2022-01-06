import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any

  constructor(private service: RestapiService) {
  }

  ngOnInit(): void {
    let resp = this.service.getBooks();
    resp.subscribe(data => this.books = data);
  }

  getBooks() {
    let resp = this.service.getBooks();
    resp.subscribe(data => this.books = data);
  }

}
