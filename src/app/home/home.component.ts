import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs: Array<any>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.apiService.get('/blogs').subscribe( 
      data => {
        console.log(data);
        this.blogs = data['blogs'];
      },
      err => console.error(err)
      );
  }
}
