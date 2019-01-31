import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable()
export class ApiService {

  apiUrl = 'https://blogitneeraj.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(this.apiUrl + url);
  }

  post(url:string, body: any) {
    return this.http.post(this.apiUrl + url, body, httpOptions);
  }

  put(url:string, body: any) {
    return this.http.put(this.apiUrl + url, body, httpOptions);
  }

  delete(url:string, body: any) {
    return this.http.delete(this.apiUrl + url);
  }
}
