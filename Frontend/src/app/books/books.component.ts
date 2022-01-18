import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DetailsComponent} from "../details/details.component";
import {Byte} from "@angular/compiler/src/util";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[]
  details: DetailsComponent
  image: Byte[]

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    //let resp =this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(data => this.books = data);
    let resp = this.service.getBooks();
    resp.subscribe((data: any) => this.books = data);
  }

  toDetails(name: string) {
    //this.details.getDetails(name);
    this.details.bookName=name;
    this.router.navigate(['/details']);

  }
}
