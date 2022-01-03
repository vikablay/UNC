import {Component} from '@angular/core';
import {Book} from "../entity/Book";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'home-app',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'Frontend';

  books: Book[];

  constructor(private http: HttpClient) {
    this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(result => {
      this.books = result;
    })
  }
}
