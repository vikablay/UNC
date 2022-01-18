import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Book } from "./entity/Book";
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
    return this.http.get(API_URL + '/api/v1/books', {headers: headers});
  }

  saveBook(name: String, authorFirstName: String, image: Object, averageRating: number){
    const body = {name, authorFirstName,image};
    return this.http.post(API_URL + '/api/v1/saveBook', body);
  }


}
