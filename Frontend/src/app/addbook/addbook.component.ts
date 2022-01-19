import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Byte} from "@angular/compiler/src/util";
import {Book} from "../entity/Book";
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  book: Book;
  bookName: string;
  authorName: string;
  description: string;
  image: File;


  title = "NOTHING"

  constructor(private service: RestapiService) {
  }

  onFileSelected(event: any) {
    console.log("IMG:  " + this.image);
    this.image = <File>event.target.files[0];
    console.log("IMG2:  " + this.image);
  }

  saveBook() {
    this.title = "book saved ";

    /*let formData = new FormData();
    formData.append("file", this.image, this.image.name);
    console.log("FOrmData:  " + formData);*/

    let resp = this.service.saveBook(this.bookName, this.authorName, this.image);
    resp.subscribe((data: any) => console.log("DATA:  " + data));
  }

}
