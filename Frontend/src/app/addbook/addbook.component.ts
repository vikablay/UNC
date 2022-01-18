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
  image: File;

  title="NOTHING"

  constructor(private service: RestapiService) {
  }

  onAddClick() {

  }

  onFileSelected(event: any) {
    this.image=<File>event.target.files[0];
  }
  saveBook() {
    this.title="book saved ";
    const fd = new FormData();
    fd.append('image',this.image,this.image.name);
    let resp = this.service.saveBook(this.bookName, this.authorFirstName,fd, 5);
    resp.subscribe((data: any) => this.book = data);
  }
}
