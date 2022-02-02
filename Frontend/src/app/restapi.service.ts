import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {Book} from "./entity/Book";
import {CookieService} from "ngx-cookie-service";
import {NewUser} from "./entity/NewUser";

const API_HOST: string = environment.backendAPIHost
const API_PORT: string = environment.backendAPIPort
const API_URL: string = 'http://' + API_HOST + ':' + API_PORT

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  login(username: string, password: string) {
    const params = {
      'username': username,
      'password': password
    }
    return this.http.get(API_URL + '/api/login', {
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    })
  }

  register(newUser: NewUser) {
    return this.http.post(API_URL + '/api/registration', newUser, {
      responseType: 'text',
      observe: 'body'
    })
  }

  getBooks() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.http.get(API_URL + '/api/v1/books', {
      headers: headers,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  getBookForDetails(name: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const params = {
      'name': name
    }
    return this.http.get(API_URL + '/api/v1/book', {
      headers: headers,
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  saveBook(name: string, firstName: string, lastName: string, image: string, description: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const body = new Book(name, [{firstName, lastName}], image, description);
    console.log("IMG RESTAPI", image);
    return this.http.post<Book>(API_URL + '/api/v1/saveBook', body, {headers: headers});
  }

  logout() {
    return this.http.post(API_URL + '/api/logout', {});
  }

  updateBook(book: Book) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.http.post<Book>(API_URL + '/api/v1/updateBook', book, {headers: headers});
  }

  updateBookRating(rating: number, id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const body = {};
    return this.http.post<Book>(API_URL + '/api/v1/updateBookRating?id=' + id + "&rating=" + rating,
      body,
      {headers: headers});
  }

  getBooksAverageRating(from: number, to: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const params = {
      'from': from,
      'to': to
    };
    return this.http.get(API_URL + '/api/v1/booksAverageRating', {
      headers: headers,
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }
}
