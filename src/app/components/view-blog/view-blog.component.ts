import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }
  blog: string;
  ngOnInit() {
    this.blog = this.route.snapshot.paramMap.get('id');
  }

}

interface Blog {
  content;
  title;
  id;
}
