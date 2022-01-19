import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {Book} from "./entity/Book";
import {CookieService} from "ngx-cookie-service";
import {Byte} from "@angular/compiler/src/util";
import {Subject} from "rxjs";

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

  saveBook(name: string, authorName: string, image: File) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });

    let formData = new FormData();
    formData.append("file", image);

    const body = {
      "name": name,
      "image": formData,
      "authorName": authorName
    };
    //const body = {"name": name,"authorName": authorName};
    console.log(image);
    return this.http.post<Book>(API_URL + '/api/v1/saveBook1',body,{headers:headers});

    //return this.http.post<Book>(API_URL + '/api/v1/saveBook',body,{ headers: {"Content-Type": "multipart/form-data"}});
  }


  public name$ = new Subject<string>();

  public changeName(name: string) {
    this.name$.next(name);
  }

}
