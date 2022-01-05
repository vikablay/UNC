import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    return this.http.get("http://localhost:8081/api/v1/auth/login", {headers, responseType: 'text' as 'json'})
  }

  getBooks() {
    return this.http.get("http://localhost:8081/api/v1/books")
  }
}