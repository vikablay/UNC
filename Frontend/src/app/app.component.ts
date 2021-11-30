import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./entity/Book";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  books: Book[];

  constructor(private http: HttpClient) {
    this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(result => {
      this.books = result;
      console.log(this.books);
    })
  }
}
