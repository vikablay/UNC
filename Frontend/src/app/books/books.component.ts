import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any

  constructor(private service: RestapiService, private http: HttpClient) {
  }

  ngOnInit(): void {
   // let resp =this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(data => this.books = data);
   let resp = this.service.getBooks();
    resp.subscribe(data => this.books = data);
  }

  getBooks() {
    let resp =this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(data => this.books = data);

  }
}
