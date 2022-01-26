import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: 'Frontend';
  isAuthenticated: boolean = false;

  constructor(private router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = (this.cookieService.get('isAuthenticated') == 'OK')
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToBooks() {
    this.router.navigate(['/books']);
  }

  goToAddBook() {
    this.router.navigate(['/addbook']);
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}
