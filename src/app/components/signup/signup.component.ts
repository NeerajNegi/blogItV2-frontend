import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = {
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    photoUrl: 'https://imgur.com/CiCqQyk.jpg'
  }

  confirmPassword: string = '';
  warningMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService, 
    private router: Router,
    public snackBar: MatSnackBar) { }

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
    this.user.first_name = this.user.first_name.trim();
    this.user.last_name = this.user.last_name.trim();
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    if(this.user.first_name && this.user.last_name && this.user.email && this.user.password && this.confirmPassword) {
      if(this.user.password === this.confirmPassword && this.confirmPassword.length >= 6) {
        this.apiService.post('/users/', this.user).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['login']);
            this.openSnackBar('User signed up, please login.', '');
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