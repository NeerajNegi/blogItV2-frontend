import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

// const imgur_headers = new Headers({'authorization': 'Client-ID 518c974fc307f31'});

export class BlogComponent implements OnInit {

  constructor() { }
  
  blogContent: string = 'Hello';
  editorConfig = {
     removePlugins: [ 'MediaEmbed', 'Table'],
     extraPlugins: [this.MyCustomUploadAdapterPlugin]
  };
  
  public Editor = ClassicEditor;

  ngOnInit() {
  }

  submitBlog() {
    console.log(this.blogContent);
  }

  MyCustomUploadAdapterPlugin(editor) {
    console.log('Upload plugin called');
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, 'https://api.imgur.com/3/upload');
    }
  }


}

class MyUploadAdapter {
  loader;
  url;
  xhr: XMLHttpRequest;
  image_string;
  constructor(loader, url) {
    this.loader = loader;
    this.url = url;
  }

  upload() {
    return new Promise( (resolve, reject) => {
      this._initRequest();
      this._initListeners( resolve, reject);
      this._sendRequest();
    })
  }

  abort() {
    if(this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open('POST', this.url, true);
    xhr.setRequestHeader('authorization', 'Client-ID 518c974fc307f31');
    xhr.responseType = 'json';
  }

 _initListeners(resolve, reject) {
   const xhr = this.xhr;
   const loader = this.loader;
   const genericErrorText = `Couldn't upload file ${loader.file.name}.`;

   xhr.addEventListener('error', () => reject(genericErrorText) );
   xhr.addEventListener('abort', () => reject());
   xhr.addEventListener('load', () => {
     const response = xhr.response;

     if(!response || response.error) {
       return reject(response && response.error ? response.error.message : genericErrorText);
     }

     console.log(response);

     resolve({default: response.data.link});
   });
   
   if(xhr.upload) {
     xhr.upload.addEventListener('progress', evt => {
       if(evt.lengthComputable) {
         loader.uploadTotal = evt.total;
         loader.uploaded = evt.loaded;
       }
     });
   }
 } 

 _sendRequest() {
   this.onFileSelected();
 }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.image_string = btoa(binaryString);

    const data = new FormData();
    data.append('image', this.image_string);
    // console.log(data.get('image'));
    this.xhr.send(data);
  }

  onFileSelected(){
    const selectedFile = this.loader.file;
    var reader = new FileReader();
    reader.onload =this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(selectedFile);
  }
}


