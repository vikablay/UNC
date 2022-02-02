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
  isAdmin: boolean = false;

  constructor(private router: Router,
              private cookieService: CookieService,
              private restAPIService: RestapiService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = (this.cookieService.get('isAuthenticated') == 'OK')
    this.isAdmin = (this.cookieService.get('role') == 'ROLE_ADMIN')
  }

  onLogoutClick() {
    this.restAPIService.logout().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('logout success')
    });
    this.cookieService.deleteAll();
    this.isAuthenticated = false;
    this.isAdmin = false;
  }
}
