import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs: Array<any>;
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.loading = true;
    this.apiService.get('/blogs').subscribe( 
      data => {
        console.log(data);
        this.blogs = data['blogs'];
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
      }
      );
  }
  
}
