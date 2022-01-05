import {Component} from '@angular/core';
import {RestapiService} from "../restapi.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private service: RestapiService) {
  }

  onLoginClick() {
    let response = this.service.login(this.username, this.password)
    response.subscribe(data => {
      console.log(data)
    })
  }
}
