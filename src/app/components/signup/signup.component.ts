import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { StorageService } from '../../services/storage.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    photoUrl: 'https://imgur.com/CiCqQyk.jpg'
  }

  confirmPassword: string = '';
  warningMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService, 
    private router: Router,
    public snackBar: MatSnackBar,
    private storage: StorageService,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['blue-snackbar']
    });
  }

  signup(): void{
    this.loading = true;
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    if(this.user.firstName && this.user.lastName && this.user.email && this.user.password && this.confirmPassword) {
      if(this.user.password === this.confirmPassword && this.confirmPassword.length >= 6) {
        this.apiService.post('/users/', this.user).subscribe(
          res => {
            console.log(res);
            // this.router.navigate(['login']);
            this.openSnackBar('User signed up, Logging in', '');
            this.apiService.post('/users/login/', {email: res['user']['email'], password: res['user']['password']}).subscribe(
              res => {
                this.storage.storeUser(JSON.stringify(res['userInfo']));
                this.loginService.loginEvent.next(true);
                this.router.navigate(['home']);
              }
            )
          },
          err => {
            console.error(err);
            this.loading = false;
            this.warningMessage = err.error.message;
          }
        );
      } else {
        this.loading = false;
        if( this.user.password !== this.confirmPassword){
          this.warningMessage = 'Passwords do not match!';
        } else if(this.user.password.length < 6) {
          this.warningMessage = 'Password must be atleast 6 characters long!';
        }
      }
    } else {
      this.loading = false;
      this.warningMessage = 'Please Enter all the fields!';
    }
  }

  setPhotoUrl(url: string) {
    this.user.photoUrl = url;
    console.log(this.user);
  }

}
