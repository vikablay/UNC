import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {DetailsComponent} from "../details/details.component";
import {Byte} from "@angular/compiler/src/util";
import {CookieService} from "ngx-cookie-service";
import {deserialize, deserializeArray} from "class-transformer";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = []

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    //let resp =this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(data => this.books = data);
    let resp = this.service.getBooks().subscribe(data => {
      this.books=deserializeArray(Book, <string>data.body)
      console.log("After " + this.books)
    });
    /*for(var book in this.books)
        for(var author in this.books[book].authors)
        console.log(this.books[book].authors[author].firstName)}*/
  }


  toDetails(name: string): void {
    this.router.navigate(['/details', name]);
  }
}
