import {Component} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";

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
  image1: string;

  title = "NOTHING"

  constructor(private service: RestapiService) {
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      // convert image file to base64 string
      console.log('onFileSelected:', reader.result);
      this.image1 = ((<string>reader.result).split(';')[1]).split(',')[1];
      console.log('image1:', this.image1);
    }, false);

    if (this.image) {
      reader.readAsDataURL(this.image);
    }
  }


  saveBook() {
    this.title = "book saved ";

    let resp = this.service.saveBook(this.bookName, this.authorName.split(' ')[0],
      this.authorName.split(' ')[1], this.image1,this.description);
    resp.subscribe(data => {
      console.log("DATA:  " + data)
    });
  }

}
