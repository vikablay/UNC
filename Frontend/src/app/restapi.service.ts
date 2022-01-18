import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {Book} from "./entity/Book";
import {CookieService} from "ngx-cookie-service";
import {Byte} from "@angular/compiler/src/util";

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
    return this.http.get(API_URL + '/api/v1/books', {headers: headers});
  }

  getBookForDetails(name: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    const params = {
      'name': name
    }
    return this.http.get(API_URL + '/api/v1/book', {headers: headers, params: params, responseType: 'text' as 'json', observe: 'response'});
  }

  saveBook(name: String, authorFirstName: String, image: FormData, averageRating: number) {
    const body = {
      'name': name,
      'authorFirstName': authorFirstName,
      'image': image
    };
    return this.http.post(API_URL + '/api/v1/saveBook', {headers: {"Content-Type": "application/json"}, params: body});
  }


}
