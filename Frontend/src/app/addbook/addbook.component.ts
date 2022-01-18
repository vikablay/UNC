import {Component} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Byte} from "@angular/compiler/src/util";

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
  image: File;

  title="NOTHING"

  constructor(private service: RestapiService) {
  }

  onAddClick() {

  }

  onFileSelected(event: any) {
    this.image=<File>event.target.files[0];
    console.log(event);
    console.log(this.image.type);
  }
  saveBook() {
    this.title="book saved ";
    let formData = new FormData();
    formData.append("file", this.image);
    console.log(formData);
    let resp = this.service.saveBook(this.bookName, this.authorFirstName,formData, 5);
    resp.subscribe((data: any) => {this.book = data;});
  }
}
