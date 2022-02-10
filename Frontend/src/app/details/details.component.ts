import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {ActivatedRoute, Router} from "@angular/router";
import {deserialize} from "class-transformer";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  book: Book;
  bookN: string;

  authors: string;
  image1: string;
  image: File;

  count: number = 0;
  isUpdate: boolean = false;

  isAdmin: boolean = false;

  constructor(private service: RestapiService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private cookieService: CookieService) {
    this.bookN = this.activateRoute.snapshot.params['bookName'];
  }

  ngOnInit(): void {
    this.service.getBookForDetails(this.bookN).subscribe(data => {
      this.book = deserialize(Book, <string>data.body);
      console.log("DETAILS2  " + this.book.name);
      for (var au in this.book.authors)
        this.count += 1;
    });

    this.isAdmin = (this.cookieService.get('role') == 'ROLE_ADMIN')
  }

  update() {
    console.log("UPDATE!!!!!!!!!!!!!!");
    this.isUpdate = true;
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

// сохраняем изменения
  saveChange() {
    if (this.authors != null) {
      for (let au in this.book.authors) {
        this.book.authors[au].firstName = this.authors.split(' ')[0];
        this.book.authors[au].lastName = this.authors.split(' ')[1];
        console.log(this.book.authors[au]);
      }
    }
    if (this.image1 != null)
      this.book.image = this.image1;
    console.log("name:", this.book.name);
    console.log("author:", this.book.authors);
    console.log("img:", this.book.image);
    this.isUpdate = false;
    this.service.updateBook(this.book).subscribe(data => console.log("DATA:  " + data));
  }


  toBooks() {
    this.router.navigate(['/books']);
  }
}
