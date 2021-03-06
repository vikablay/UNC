import {Component, OnInit} from '@angular/core';
import {deserialize} from "class-transformer";
import {RestapiService} from "../restapi.service";
import {CookieService} from "ngx-cookie-service";
import {NewUser} from "../entity/NewUser";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: NewUser;

  constructor(private service: RestapiService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.service.getUser(this.cookieService.get('userName')).subscribe(data => {
      this.user = deserialize(NewUser, <string>data.body);
      console.log(this.user);
    });
  }

}
