import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {RestapiService} from "./restapi.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: 'Frontend';
  isAuthenticated: boolean = false;

  constructor(private router: Router,
              private cookieService: CookieService,
              private restAPIService: RestapiService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = (this.cookieService.get('isAuthenticated') == 'OK')
  }

  onLogoutClick() {
    this.restAPIService.logout().subscribe(data => {
        console.log(data)
      },
      error => {
        console.log(error)
      });
    this.cookieService.delete("isAuthenticated");
    this.cookieService.delete("access_token");
    this.isAuthenticated = false;
  }
}
