import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }
  
  blogContent: string = 'Hello';
  editorConfig = {
     removePlugins: [ 'MediaEmbed', 'Table']
  };
  
  public Editor = ClassicEditor;

  ngOnInit() {
  }


}
