import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

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

  base64textString;
  selectedFile: File = null;
  encodedImage;
  photo_url;
  imgur_headers = new Headers({'authorization': 'Client-ID 518c974fc307f31'});

  confirmPassword: string = '';
  warningMessage: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService, 
    private router: Router,
    public snackBar: MatSnackBar,
    public http: HttpClient) { }

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

//   handleReaderLoaded(readerEvt) {
//     var binaryString = readerEvt.target.result;
//     this.base64textString= btoa(binaryString);
//  }

//  onFileSelected(e){
//    this.selectedFile = <File>e.target.files[0];
//    console.log('File Selected');
//    //console.log(typeof this.selectedFile);

//    var reader = new FileReader();
//    reader.onload =this.handleReaderLoaded.bind(this);
//    reader.readAsBinaryString(this.selectedFile);
//  }

//  onUpload(flag){
//    this.openSnackBar('Uploading Photo...','');
//    console.log(this.selectedFile);
//    //console.log('Base 64 string: ', this.base64textString);
//    if(this.selectedFile) {
//      console.log('Uploading File');
//      const data = {
//        image: this.base64textString,
//        type: 'base64'
//      }
//      this.http.post('https://api.imgur.com/3/upload', data, { headers: {'authorization': 'Client-ID 518c974fc307f31'} })
//      .subscribe( (res:any) => {
//        console.log(res);
//        if (flag === 1) {
//          this.user.photo_url = res.data.link;
//          console.log('User :', this.user.photo_url);
//        } else {
//          this.newUser.photo_url = res.data.link;
//          console.log('New User :', this.newUser.photo_url);
//        }
//        this.openSnackBar('Photo Uploaded','');
//      }, (error)=>{
//        console.log(error);
//        this.openSnackBar('Error uploading Photo','');
//      });
//    } else {
//      alert('Select A file first');
//    }
//  }

}
