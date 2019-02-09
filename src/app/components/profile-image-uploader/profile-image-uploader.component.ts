import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-image-uploader',
  templateUrl: './profile-image-uploader.component.html',
  styleUrls: ['./profile-image-uploader.component.css']
})
export class ProfileImageUploaderComponent implements OnInit {

  constructor(public http: HttpClient) { }

  base64textString;
  selectedFile: File = null;
  encodedImage;
  photourl = 'https://imgur.com/CiCqQyk.jpg';
  @Input() url : string;
  @Output() setPhotoUrl = new EventEmitter<string>();
  imgur_headers = new Headers({'authorization': 'Client-ID 518c974fc307f31'});
  loading: boolean = false;

  ngOnInit() {
    this.photourl = this.url;
  }

  setUrl() {
    this.setPhotoUrl.emit(this.photourl);
  }

  handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.base64textString= btoa(binaryString);
  }

  onFileSelected(e){
    this.selectedFile = <File>e.target.files[0];
    console.log('File Selected');
    // console.log(typeof this.selectedFile);
    // console.log(this.selectedFile);

    var reader = new FileReader();
    reader.onload =this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.selectedFile);
    alert('Now Click on Upload to submit photo.');
  }

  onUpload(){
    this.loading = true;
    // console.log(this.selectedFile);
    // console.log('Base 64 string: ', this.base64textString);
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
        // console.log(this.photourl);
        this.loading = false;
        this.setUrl();
      }, (error)=>{
        this.loading = false;
        console.log(error);
      });
    } else {
      alert('Select A file first');
    }
  }
}
