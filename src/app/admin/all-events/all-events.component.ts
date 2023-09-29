import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Event } from 'src/core/models/event.model';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {
  constructor(private router: Router, private service: ApiService) {}

  events?: Event[];

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data;      
       //console.log(this.events);
    });
  }
}
