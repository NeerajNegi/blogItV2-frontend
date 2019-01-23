import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.apiService.get('/blogs').subscribe( 
      data => console.log(data),
      err => console.error(err),
      () => console.log('Done loading Blogs')
      );
  }

  // postUser() {
  //   const body = {
  //     first_name: 'Dave',
  //     last_name: 'Lee',
  //     password: 'dave2d',
  //     email: 'dave@gmail.com'
  //   }
  //   this.apiService.post('/users/', body).subscribe(
  //     res => console.log(res),
  //     err => console.error(err),
  //     () => console.log('Done adding User')
  //   );
  // }
}
