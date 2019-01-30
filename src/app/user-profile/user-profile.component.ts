import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private storage: StorageService) { }
  user: any;
  isEditing: boolean = false;
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

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  updateUserInfo(): void {
    this.loading = true;
    setTimeout(() => {
      console.log('done');
      this.loading = false;
      this.isEditing = false;
    }, 1000);
  }
}
