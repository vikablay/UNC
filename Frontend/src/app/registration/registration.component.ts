import {Component, ViewEncapsulation} from '@angular/core';
import {User} from "../entity/User";
import {RestapiService} from "../restapi.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent {
  username: string;
  password: string;
  email: string;
  selectedRole: number;
  roleToPass: string[] = [];

  roles = [
    {id: 1, name: "ROLE_ADMIN", placeholder: "Администратор"},
    {id: 2, name: "ROLE_CUSTOMER", placeholder: "Покупатель"}
  ]

  constructor(private restAPIService: RestapiService,
              private snackBar: MatSnackBar) {
  }

  onRegisterClick() {
    this.roleToPass.push(this.roles[this.selectedRole - 1].name);
    let newUser = new User(this.username, this.password, this.email, this.roleToPass)
    this.restAPIService.register(newUser).subscribe(data => {
      this.snackBar.open(data, 'OK', {duration: 1000 * 10});
    });
  }
}
