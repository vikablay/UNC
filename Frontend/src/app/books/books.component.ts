import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {DetailsComponent} from "../details/details.component";
import {Byte} from "@angular/compiler/src/util";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[]
  details: DetailsComponent
  image: Byte[]
  bookName: string

  @Output() buttonClick = new EventEmitter();

  isButton: boolean=true;

  constructor(private service: RestapiService, private router: Router) {
  }

  ngOnInit(): void {
    //let resp =this.http.get<Book[]>('http://localhost:8081/api/v1/books').subscribe(data => this.books = data);
    let resp =this.service.getBooks().subscribe((data: any) => this.books = data);
    /*for(var book in this.books)
        for(var author in this.books[book].authors)
        console.log(this.books[book].authors[author].firstName)}*/
  }

  public setAnyCount(name: string): void {
    this.service.changeName(name);
  }



  toDetails(name: string): void {
   // this.buttonClick.emit(name);
    //this.service.changeName(name);
    this.router.navigate(['/details']);
   /* this.isButton=false;
    this.bookName = name;
    //this.details.getDetails(name);
    this.router.navigate(['/details']);*/

  }
}
