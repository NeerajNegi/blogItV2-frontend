import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;
  displayName: string = '';

  constructor(private apiService: ApiService, 
              private storage: StorageService,
              private router: Router) { }

  ngOnInit() {
    // call for auth service and check if user is loggedIn then set loggedIn to true
    this.getUser();
  }

  logout(): void {
    this.storage.clearInfo();
    this.loggedIn = false;
    this.router.navigate(['home']);
  }

  getUser(): void {
    const user = this.storage.retrieveUser();
    if(user){
      this.displayName = user.firstName + ' ' + user.lastName;
      this.loggedIn = true;
    }
  }

}
