import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable()
export class ApiService {

  apiUrl = 'https://blogitneeraj.herokuapp.com/api';
  token: string;
  header: HttpHeaders;

  constructor(private http: HttpClient, private storage: StorageService) { 
    this.token = this.storage.retrieveAccessToken();
    this.header = new HttpHeaders({'token': this.token});
    console.log(this.header);
    console.log(this.token);
  }

  get(url: string) {
    return this.http.get(this.apiUrl + url, {headers: this.header});
  }

  post(url:string, body: any) {
    console.log(this.header);
    return this.http.post(this.apiUrl + url, body, {headers: this.header});
  }

  put(url:string, body: any) {
    return this.http.put(this.apiUrl + url, body, {headers: this.header});
  }

  delete(url:string, body: any) {
    return this.http.delete(this.apiUrl + url,  {headers: this.header});
  }
}
