//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';


//Components
import { AppComponent } from './app.component';
import { ProfileImageUploaderComponent } from './components/profile-image-uploader/profile-image-uploader.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogComponent } from './components/blog/blog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

//Services
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth.guard';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogCardComponent,
    BlogComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    ProfileImageUploaderComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [ApiService, StorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
