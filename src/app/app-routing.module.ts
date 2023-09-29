import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CausesComponent } from './causes/causes.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { RefleshPage } from './refleshPage';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AllEventsComponent } from './admin/all-events/all-events.component';
import { AllCommentsComponent } from './admin/all-comments/all-comments.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'causes', component: CausesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event-detail', component: EventDetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-allusers', component: AllUsersComponent },
  { path: 'admin-categories', component: CategoriesComponent },
  { path: 'admin-allevents', component: AllEventsComponent },
  {path:'admin-allcomments',component:AllCommentsComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: RefleshPage }],
})
export class AppRoutingModule {}
