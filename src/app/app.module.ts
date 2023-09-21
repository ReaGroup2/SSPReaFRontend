import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CausesComponent } from './causes/causes.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { SliderComponent } from './Sliders/slider/slider.component';
import { HomeSliderComponent } from './Sliders/home-slider/home-slider.component';
import { HomeCards1Component } from './Cards/home-cards1/home-cards1.component';
import { LatestCausesComponent } from './latest-causes/latest-causes.component';
import { WhyChooseUsComponent } from './home/why-choose-us/why-choose-us.component';
import { LatestEventsComponent } from './home/latest-events/latest-events.component';
import { DonateNowComponent } from './home/donate-now/donate-now.component';
import { SloganComponent } from './slogan/slogan.component';
import { OurMissionComponent } from './about/our-mission/our-mission.component';
import { OurTeamComponent } from './about/our-team/our-team.component';
import { FeaturedCauseComponent } from './causes/featured-cause/featured-cause.component';
import { EventsComponent } from './causes/events/events.component';
import { LatestBlogsComponent } from './blog/latest-blogs/latest-blogs.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { EventsCardComponent } from './events-card/events-card.component';
import { GradientsDashboardComponent } from './home/gradients-dashboard/gradients-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    CausesComponent,
    BlogComponent,
    ContactComponent,
    SliderComponent,
    HomeSliderComponent,
    HomeCards1Component,
    LatestCausesComponent,
    WhyChooseUsComponent,
    LatestEventsComponent,
    DonateNowComponent,
    SloganComponent,
    OurMissionComponent,
    OurTeamComponent,
    FeaturedCauseComponent,
    EventsComponent,
    LatestBlogsComponent,
    ContactFormComponent,
    EventsCardComponent,
    GradientsDashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
