import { Component, OnInit } from '@angular/core';
import {RestapiService} from "../restapi.service";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  bookName: string;
  authorFirstName: string;
  description: string;
  image: any;

  constructor(private service: RestapiService) { }

  onAddClick() {

  }

}
