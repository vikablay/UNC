import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  book: any;
  bookName: string;
  authorFirstName: string;
  description: string;
  image: object;

  title="NOTHING"

  constructor(private service: RestapiService) {
  }

  onAddClick() {

  }

  saveBook() {
    this.title="book saved ";
    let resp = this.service.saveBook(this.bookName, this.authorFirstName,this.image, 5);
    resp.subscribe((data: any) => this.book = data);
  }
}
