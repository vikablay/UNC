import {Component} from '@angular/core';
import {Book} from "../entity/Book";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books: Book[];

  constructor(private http: HttpClient) {
    this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(result => {
      this.books = result;
    })
  }
}
