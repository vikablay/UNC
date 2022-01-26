import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';
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
    return this.http.get(API_URL + '/api/login',
      {params: params, responseType: 'text' as 'json', observe: 'response'})
  }

  register(newUser: NewUser) {
    return this.http.post(API_URL + '/api/registration', newUser, {responseType: 'text', observe: 'body'})
  }

  getBooks() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.http.get(API_URL + '/api/v1/books', {headers: headers});
  }

  saveBook(name: string, authorFirstName: string, image: object, description: string) {
    return this.http.get(API_URL + '/api/v1/saveBook')
  }


}
