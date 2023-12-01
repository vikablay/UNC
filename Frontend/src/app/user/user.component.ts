import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {User} from "../entity/User";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    users: User[] = [];
    columns: string[] = ['id', 'username', 'email', 'actions']
    dataSource = new MatTableDataSource<Object>();

    constructor(private restAPIService: RestapiService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.restAPIService.getUsers().subscribe(data => {
            this.users = JSON.parse(<string>data.body);
            this.dataSource.data = this.users
        })
    }

    deleteUserById(id: number) {
        this.restAPIService.deleteUserById(id).subscribe(data => {
            this.router.navigate(['user']);
            this.snackBar.open('Пользователь удален', 'OK', {duration: 1000 * 10})
        })
    }
}
