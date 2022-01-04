import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: 'Frontend'

  constructor(private router: Router) {
  }

  goToHome(){
    this.router.navigate(['/home']);
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
}
