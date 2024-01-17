import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {User} from "../entity/User";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserEditorComponent} from "../user-editor/user-editor.component";

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    constructor(private restAPIService: RestapiService,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    users: User[] = [];
    columns: string[] = ['id', 'username', 'email', 'actions']
    dataSource = new MatTableDataSource<Object>();

    ngOnInit(): void {
        this.restAPIService.getUsers().subscribe(data => {
            this.users = JSON.parse(<string>data.body);
            this.dataSource.data = this.users
        })
    }

    deleteUserById(id: number) {
        this.restAPIService.deleteUserById(id).subscribe(data => {
            this.snackBar.open('Пользователь удален', 'OK', {duration: 1000 * 10})
            this.ngOnInit();
        })
    }

    updateUserById(id: number) {
        const dialogConfig = new MatDialogConfig();

        let user = this.users.find(user => user.id == id.toString());

        dialogConfig.data = {
            id: 1,
            username: user?.username,
            email: user?.email
        };

        this.dialog.open(UserEditorComponent, dialogConfig);
    }
}
