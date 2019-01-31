import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private AUTH_TOKEN = 'UserAuthToken';
  private ACCESS_TOKEN = 'UserAccessToken';
  private USER_DATA = 'UserData';
  private REDIRECT_URL = 'redirectUrl';
  
  constructor() { }

  storeAuthToken(value: string) {
    localStorage.setItem(this.AUTH_TOKEN, value);
  }

  retrieveAuthToken(): string {
    return localStorage.getItem(this.AUTH_TOKEN);
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.AUTH_TOKEN);
  }

  storeAccessToken(value: string) {
    localStorage.setItem(this.ACCESS_TOKEN, value);
  }

  retrieveAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  clearAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  clearInfo() {
    localStorage.removeItem(this.USER_DATA);
  }

  storeUser(value: string) {
    localStorage.setItem(this.USER_DATA, value);
  }

  retrieveUser() {
    return JSON.parse(localStorage.getItem(this.USER_DATA));
  }
  storeRedirectUrl() {
      localStorage.setItem( this.REDIRECT_URL, window.location.href);
  }

}
