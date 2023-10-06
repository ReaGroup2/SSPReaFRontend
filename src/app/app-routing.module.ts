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
import { AllEventParticipantComponent } from './admin/all-event-participant/all-event-participant.component';
import { ErrorComponent } from './error/error.component';
import { adminControl, loginControl, organizatorMemberControl } from './admin-control';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AttendedEventsComponent } from './member/attended-events/attended-events.component';
import { MyCommentsComponent } from './member/my-comments/my-comments.component';
import { MyLikesComponent } from './member/my-likes/my-likes.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'causes', component: CausesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event-detail', component: EventDetailComponent },
  { path: 'admin-allusers', component: AllUsersComponent,canActivate:[adminControl]},
  { path: 'admin-allcategories', component: CategoriesComponent ,canActivate:[adminControl]},
  { path: 'admin-allevents', component: AllEventsComponent ,canActivate:[adminControl]},
  { path: 'admin-allcomments', component: AllCommentsComponent ,canActivate:[adminControl]},
  {
    path: 'admin-all-event-participant',
    component: AllEventParticipantComponent,canActivate:[adminControl]
  },
  {path: 'error', component: ErrorComponent },
  {path:'profile', component: AdminProfileComponent,canActivate:[loginControl]},
  {path:'member-attendent-events',component:AttendedEventsComponent,canActivate:[organizatorMemberControl]},
  {path:'member-mycomments',component:MyCommentsComponent,canActivate:[organizatorMemberControl]},
  {path:'member-mylikes',component:MyLikesComponent,canActivate:[organizatorMemberControl]}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: RefleshPage }],
})
export class AppRoutingModule {
  constructor() {}
}
