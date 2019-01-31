import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  constructor() { }
  
  @Input() blog: Blog;
  blogCaption = '';

  ngOnInit() {
    const lim = this.blog.content.length > 100 ? 100 : this.blog.content.length;
    for (let i = 0; i < lim; i++) {
      this.blogCaption += this.blog.content[i];
    }
  }

}

interface Blog {
  content;
  title;
  id;
}