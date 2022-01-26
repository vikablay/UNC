import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {Book} from "./entity/Book";
import {CookieService} from "ngx-cookie-service";

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
    return this.http.get(API_URL + '/api/login',
      {params: params, responseType: 'text' as 'json', observe: 'response'})
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
    /*body.name = name;
    body.image = image;
    body.authors = [{firstName, lastName}];
    body.description = description;*/

    console.log("IMG RESTAPI", image);
    return this.http.post<Book>(API_URL + '/api/v1/saveBook', body, {headers: headers});
  }

}
