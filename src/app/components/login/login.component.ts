import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

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
  loading: boolean = false;
  warningMessage: string = '';

  constructor(private apiService: ApiService, 
              private router: Router,
              private storage: StorageService,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  login(event: Event): void {
    event.preventDefault();
    this.loading = true;
    this.warningMessage = '';

    if( this.user.email && this.user.password ){
      this.apiService.post('/users/login', this.user).subscribe(
        res => {
          console.log('User logged In');
          this.storage.storeUser(JSON.stringify(res['userInfo']));
          this.loginService.loginEvent.next(true);
          this.router.navigate(['home']);
        },
        err => {
          console.error(err);
          this.loading = false;
          this.warningMessage = err.error.message;
        }
      );
    } else {
      this.loading = false;
      this.warningMessage = 'Please enter all the fields.';
    }

  }

}
