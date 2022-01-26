import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {CookieService} from "ngx-cookie-service";
import {AuthResp} from "../entity/AuthResp";
import {deserialize} from "class-transformer";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  authResp: AuthResp;
  isAuthenticated: boolean;

  constructor(private restAPIService: RestapiService,
              private cookieService: CookieService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.cookieService.check('isAuthenticated')) {
      this.isAuthenticated = (this.cookieService.get('isAuthenticated') == 'OK')
    }
  }

  onLoginClick() {
    this.restAPIService.login(this.username, this.password).subscribe(resp => {
        this.authResp = deserialize(AuthResp, <string>resp.body)
        this.cookieService.set('access_token', this.authResp.access_token, {expires: 1})
        this.cookieService.set('isAuthenticated', resp.statusText)
        this.isAuthenticated = (resp.statusText == 'OK')
        let role = this.authResp.roles.substring(1, this.authResp.roles.length - 1)
        console.log(role)
      },
      error => {
        this.snackBar.open('Неверное имя пользователя или пароль', 'OK', {duration: 1000 * 10})
      })
  }
}
