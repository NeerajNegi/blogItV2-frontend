import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogComponent } from './blog/blog.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogCardComponent,
    BlogComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService, StorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
