import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

const API_HOST: string = environment.backendAPIHost
const API_PORT: string = environment.backendAPIPort
const API_URL: string = 'http://' + API_HOST + ':' + API_PORT

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) })
    return this.http.get(API_URL + '/api/login', { headers, responseType: 'text' as 'json' })
  }

  getBooks() {
    return this.http.get(API_URL + '/api/v1/books')
  }


}
