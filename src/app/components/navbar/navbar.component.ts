import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;
  displayName: string = '';
  photoUrl: string = '';

  constructor(private apiService: ApiService, 
              private storage: StorageService,
              private router: Router,
              private login: LoginService) { }

  ngOnInit() {
    //this getUser call is used for returning user to change navbar view.
    this.getUser();
    // listen for login event to change navbar view
    this.login.loginEvent.subscribe( (res) => {
      console.log(res);
      this.getUser();
    });
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
      this.photoUrl = user.photoUrl;
    }
  }

}
