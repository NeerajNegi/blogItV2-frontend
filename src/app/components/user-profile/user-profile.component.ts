import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private storage: StorageService, public api: ApiService) { }
  user: any;
  loading: boolean = false;

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const user = this.storage.retrieveUser();
    if(user){
      this.user = user;
    }
  }

  updateUserInfo(): void {
    this.loading = true;
    this.api.put('/users/' + this.user.id, this.user).subscribe(
      res => {
        console.log(res);
        this.loading = false;
      }, err => {
        console.log(err);
        this.loading = false;
      })
  }
}
