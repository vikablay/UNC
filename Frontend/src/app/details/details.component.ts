import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Book} from "../entity/Book";
import {ActivatedRoute, Router} from "@angular/router";
import {deserialize} from "class-transformer";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    book: any;
    bookName: string;

    authors: string;
    imgBase64: string;
    image: File;

    count: number = 0;
    isUpdate: boolean = false;

    isAdmin: boolean = false;

    constructor(private service: RestapiService,
                private router: Router,
                private activateRoute: ActivatedRoute,
                private cookieService: CookieService) {
        this.bookName = this.activateRoute.snapshot.params['bookName'];
    }

    ngOnInit(): void {
        this.isAdmin = (this.cookieService.get('role') == 'ROLE_ADMIN')

        this.service.getBookForDetails(this.bookName).subscribe(data => {
            this.book = JSON.parse(<string>data.body);
            for (var au in this.book.authors) {
                this.count += 1;
                this.authors = this.book.authors[au].firstName + " " + this.book.authors[au].lastName
            }
        });
    }

    update() {
        this.isUpdate = true;
    }

    onFileSelected(event: any) {
        this.image = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("loadend", () => {
            // convert image file to base64 string
            this.imgBase64 = ((<string>reader.result).split(';')[1]).split(',')[1];
        }, false);
        if (this.image) {
            reader.readAsDataURL(this.image);
        }
    }

    saveChange() {
        if (this.authors != null) {
            for (let au in this.book.authors) {
                this.book.authors[au].firstName = this.authors.split(' ')[0];
                this.book.authors[au].lastName = this.authors.split(' ')[1];
                console.log(this.book.authors[au]);
            }
        }
        if (this.imgBase64 != null)
            this.book.image = this.imgBase64;
        console.log("name:", this.book.name);
        console.log("author:", this.book.authors);
        console.log("img:", this.book.image);
        this.isUpdate = false;
        this.service.updateBook(this.book).subscribe();
    }


    toBooks() {
        this.router.navigate(['/books']);
    }

    delete() {
        this.service.deleteBookById(this.book.id).subscribe(data => {
            this.router.navigate(['/books']).then(location.reload);
        })
    }
}
