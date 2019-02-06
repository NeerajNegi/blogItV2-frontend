import { Component, OnInit, Pipe } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})

// const imgur_headers = new Headers({'authorization': 'Client-ID 518c974fc307f31'});

export class CreateBlogComponent implements OnInit {

  constructor(private http: HttpClient) { }

  base64textString;
  selectedFile: File = null;
  encodedImage;
  loading: boolean = false;
  // blogContent: string = '<img src="https://i.imgur.com/kNPmIAx.png"><p>Hello</p>';
  blogContent: string = 'Hey There!, Go ahead write Something, You can also add images to blogs.';
  editorConfig = {
     removePlugins: [ 'MediaEmbed', 'Table'],
     extraPlugins: [this.MyCustomUploadAdapterPlugin]
  };

  photourl = 'https://images.pexels.com/photos/1417651/pexels-photo-1417651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

  public Editor = ClassicEditor;

  ngOnInit() {
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
  }

  onFileSelected(e){
    this.selectedFile = <File>e.target.files[0];
    console.log('File Selected');
    console.log(typeof this.selectedFile);
    console.log(this.selectedFile);

    alert('Now Press Upload Button');

    var reader = new FileReader();
    reader.onload =this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.selectedFile);
  }

  onUpload(){
    this.loading = true;
    console.log(this.selectedFile);
    console.log('Base 64 string: ', this.base64textString);
    if(this.selectedFile) {
      console.log('Uploading File');
      const data = {
        image: this.base64textString,
        type: 'base64'
      }
      this.http.post('https://api.imgur.com/3/upload', data, { headers: {'authorization': 'Client-ID 518c974fc307f31'} })
      .subscribe( (res:any) => {
        console.log(res);
        this.photourl= res.data.link;
        console.log(this.photourl);
        this.loading = false;
        // this.setUrl();
      }, (error)=>{
        this.loading = false;
        console.log(error);
      });
    } else {
      alert('Select A file first');
    }
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

//Custom Image Upload Adapter
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

