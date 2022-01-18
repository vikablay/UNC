import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  books: any;
  bookName: string;
  authorFirstName: string;
  description: string;
  image: object;

  constructor(private service: RestapiService) {
  }

  onAddClick() {

  }

  saveBook() {
    let resp = this.service.saveBook(this.bookName, this.authorFirstName, this.image, this.description);
    resp.subscribe(data => this.books = data);
    this.bookName = '';
    this.authorFirstName = '';
    this.description = '';
  }
}
