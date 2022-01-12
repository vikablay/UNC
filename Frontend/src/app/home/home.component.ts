import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RestapiService} from "../restapi.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books: any;

  constructor(private http: HttpClient, private service: RestapiService) {
      this.books = service.getBooks();
  }
}
