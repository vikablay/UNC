import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {ActivatedRoute, Router} from "@angular/router";
import {deserialize} from "class-transformer";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  book: Book;
  bookN: string;
  count: number = 0;

  constructor(private service: RestapiService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.bookN = this.activateRoute.snapshot.params['bookName'];
  }

  ngOnInit(): void {
    this.service.getBookForDetails(this.bookN).subscribe(data => {
      this.book = deserialize(Book, <string>data.body);
      console.log("DETAILS2  " + this.book.name);
      for (var au in this.book.authors)
        this.count += 1;
    });
  }

  toBooks() {
    this.router.navigate(['/books']);
  }
}
