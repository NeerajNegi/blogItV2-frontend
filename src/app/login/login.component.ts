import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    email: '',
    password: ''
  }

  constructor(private apiService: ApiService, 
              private router: Router,
              private storage: StorageService) { }

  ngOnInit() {
  }

  login(): void {
    this.apiService.post('/users/login', this.user).subscribe(
      res => {
        console.log('User logged In');
        this.storage.storeUser(JSON.stringify(res));
        this.router.navigate(['home']);
      },
      err => console.error(err),
      () => console.log('Login Request Complete')
    );
  }
}
