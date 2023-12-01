import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {RestapiService} from "./restapi.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title: 'Frontend';
    isAuthenticated: boolean = false;
    isAdmin: boolean = false;

    constructor(private cookieService: CookieService,
                private restAPIService: RestapiService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.isAuthenticated = (this.cookieService.get('isAuthenticated') == 'OK');
        this.isAdmin = (this.cookieService.get('role') == 'ROLE_ADMIN');
    }

    onLogoutClick() {
        this.restAPIService.logout().subscribe({
            next: (data) => console.log(data),
            error: (error) => console.log(error),
            complete: () => this.snackBar.open('Вы вышли из системы', 'OK', {duration: 1000 * 10})
        });
        this.cookieService.deleteAll();
        this.isAuthenticated = false;
        this.isAdmin = false;
    }

    activate(event: any) {
        this.ngOnInit()
    }
}
