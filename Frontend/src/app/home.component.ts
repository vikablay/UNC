import {Component} from '@angular/core';
import {Book} from "./entity/Book";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'home-app',
  template: `<h3>Главная</h3>
  <div>{{books[0].name}}
  </div>`
})
export class HomeComponent {
  title = 'Frontend';

  books: Book[];

  constructor(private http: HttpClient) {
    this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(result => {
      this.books = result;
      console.log(this.books);
    })
  }
}
