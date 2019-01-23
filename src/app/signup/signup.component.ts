import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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
    email: ''
  }

  confirmPassword: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  signup(): void{
    this.user.first_name = this.user.first_name.trim();
    this.user.last_name = this.user.last_name.trim();
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    if(this.user.password === this.confirmPassword && this.confirmPassword.length >= 6) {
      this.apiService.post('/users/', this.user).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['login']);
        },
        err => console.error(err),
        () => console.log('Signup Request Complete')
      );
    } else {
      alert('Passwords does not match or length is less than 6');
    }
  }
}