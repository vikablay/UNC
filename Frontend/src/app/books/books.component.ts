import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {Router} from "@angular/router";
import {deserialize, deserializeArray} from "class-transformer";
import {User} from "../entity/User";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

    books: Book[] = []

    from: number;
    to: number;

    ratingClicked: number;
    rating = 0;

    isRated: boolean = false;
    user: User;
    isAdmin: boolean = false;

    constructor(private service: RestapiService,
                private router: Router,
                private cookieService: CookieService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.service.getBooks().subscribe(data => {
            this.books = deserializeArray(Book, <string>data.body);
        });
        this.service.getUser(this.cookieService.get('userName')).subscribe(data => {
            this.user = deserialize(User, <string>data.body);
        });
        this.isAdmin = (this.cookieService.get('role') == 'ROLE_ADMIN')
    }


    ratingComponentClick(clickObj: any): void {
        if (this.user === undefined) {
            this.service.getUser(this.cookieService.get('userName')).subscribe(data => {
                this.user = deserialize(User, <string>data.body);
            });
        }

        const item = this.books.find(((i: Book) => i.id === clickObj.itemId));

        for (let b in this.user.ratedBooks) {
            if (this.user.ratedBooks[b].id == clickObj.itemId)
                this.isRated = true;
        }
        if (!this.isRated) {
            if (!!item) {
                this.rating = clickObj.rating;
                console.log(this.rating, clickObj.itemId);
                let resp = this.service.updateBookRating(this.rating, clickObj.itemId);
                resp.subscribe(data => {
                    console.log("DATA:  " + data)
                });

                this.service.addRatedBookToUser(clickObj.itemId, this.cookieService.get('userName')).subscribe(
                    data => {
                        this.user = data;
                        console.log("USER addRatedBookToUser:", data);
                    });
            }
        } else {
            console.log(this.isRated);
            this.isRated = false;
            this.snackBar.open('Вы уже оценивали эту книгу', 'OK', {duration: 1000 * 10})
        }
    }

    getUser() {
        this.service.getUser(this.cookieService.get('userName')).subscribe(data => {
            this.user = deserialize(User, <string>data.body);
            console.log("USER:", this.user);
        });
    }

    chooseRating() {
        console.log(this.from, this.to);
        this.service.getBooksAverageRating(this.from, this.to).subscribe(data => {
            this.books = deserializeArray(Book, <string>data.body);
            console.log(this.books);
        });
    }

    addPurchasedBookToUser(id: number) {
        //let userName = this.user.username;
        console.log(id, this.cookieService.get('userName'));
        this.service.addPurchasedBookToUser(id, this.cookieService.get('userName')).subscribe(data => {
            console.log(data);
        });
    }

    toDetails(name: string): void {
        this.router.navigate(['details', name]);
    }
}
