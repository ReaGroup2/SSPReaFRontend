import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Event } from 'src/core/models/event.model';
import { Category } from 'src/core/models/category.model';
import { User } from 'src/core/models/user.model';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {
  constructor(private router: Router, private service: ApiService) {}

  events?: Event[];
  categories?: Category[];
  ngOnInit(): void {
    this.getAllEvents();
  
  }
  
  
  getAllEvents() {
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data;      
      
  } );
}
}
