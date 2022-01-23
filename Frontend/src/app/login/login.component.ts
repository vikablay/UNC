import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {CookieService} from "ngx-cookie-service";
import {AuthResp} from "../entity/AuthResp";
import {deserialize} from "class-transformer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  tokens: AuthResp;
  isAuthenticated: boolean;

  constructor(private restAPIService: RestapiService,
              private cookieService: CookieService) {
  }


  ngOnInit(): void {
    if (this.cookieService.check('isAuthenticated')) {
      this.isAuthenticated = (this.cookieService.get('isAuthenticated') == 'OK')
    }
  }

  onLoginClick() {
    this.restAPIService.login(this.username, this.password).subscribe(resp => {
      this.tokens =deserialize(AuthResp, <string>resp.body)
      this.cookieService.set('access_token', this.tokens.access_token)
      console.log(this.cookieService.get('access_token'))
      this.cookieService.set('isAuthenticated', resp.statusText)
      this.isAuthenticated = (resp.statusText == 'OK')
    })
  }

}
