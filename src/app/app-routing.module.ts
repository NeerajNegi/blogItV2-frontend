import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { AuthGuard } from './services/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OwnBlogsComponent } from './components/own-blogs/own-blogs.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'ownBlogs',
    component: OwnBlogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewBlog',
    component: ViewBlogComponent
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch:  'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
