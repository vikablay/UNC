import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  roles = [
    {name: "ROLE_ADMIN"},
    {name: "ROLE_CUSTOMER"}
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  onLoginClick() {

  }
}
