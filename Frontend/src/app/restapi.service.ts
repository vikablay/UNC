import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {Book} from "./entity/Book";
import {CookieService} from "ngx-cookie-service";
import {NewUser} from "./entity/NewUser";

const API_HOST: string = environment.backendAPIHost
const API_PORT: string = environment.backendAPIPort
// const API_URL: string = 'http://' + API_HOST + ':' + API_PORT
const API_URL: string = 'http://localhost:8081'

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {
    console.log(API_URL)
  }

  login(username: string, password: string) {
    const params = {
      'username': username,
      'password': password
    }
    return this.httpClient.get(API_URL + '/api/login', {
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    })
  }

  register(newUser: NewUser) {
    return this.httpClient.post(API_URL + '/api/registration', newUser, {
      responseType: 'text',
      observe: 'body'
    })
  }

  getBooks() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.get(API_URL + '/api/v1/books', {
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
    return this.httpClient.get(API_URL + '/api/v1/book', {
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
    return this.httpClient.post<Book>(API_URL + '/api/v1/saveBook', body, {headers: headers});
  }

  updateBook(book: Book) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.post<Book>(API_URL + '/api/v1/updateBook', book, {headers: headers});
  }

  deleteBookById(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    let params = new HttpParams().set('id', id)
    return this.httpClient.post<Book>(API_URL + '/api/v1/deleteBook', {}, {headers: headers, params: params});
  }

  logout() {
    return this.httpClient.post(API_URL + '/api/logout', {});
  }

  updateBookRating(rating: number, id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const body = {};
    return this.httpClient.post<Book>(API_URL + '/api/v1/updateBookRating?id=' + id + "&rating=" + rating,
      body,
      {headers: headers});
  }

  addPurchasedBookToUser(bookId: number, userName: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const body = {};
    return this.httpClient.post<NewUser>(API_URL + '/api/v1/user/addPurchased?bookId=' + bookId + "&userName=" + userName,
      body,
      {headers: headers});
  }

  addRatedBookToUser(bookId: number, userName: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const body = {};
    return this.httpClient.post<NewUser>(API_URL + '/api/v1/user/addRated?bookId=' + bookId + "&userName=" + userName,
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
    return this.httpClient.get(API_URL + '/api/v1/booksAverageRating', {
      headers: headers,
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  getBooksOfAuthor(author: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const params = {
      'author': author
    };
    return this.httpClient.get(API_URL + '/api/v1/booksOfAuthor', {
      headers: headers,
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  getBooksOfSearch(search: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const params = {
      'search': search
    };
    return this.httpClient.get(API_URL + '/api/v1/searchBooks', {
      headers: headers,
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  getSortedBooksOfRating() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.get(API_URL + '/api/v1/sortOfAverageRating', {
      headers: headers,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  getSortedBooksOfAuthor() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });

    return this.httpClient.get(API_URL + '/api/v1/sortOfAuthor', {
      headers: headers,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  getUser(userName: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const params = {
      'userName': userName
    };
    return this.httpClient.get(API_URL + '/api/v1/user', {
      headers: headers,
      params: params,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }


}
