import { Component, Input } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css']
})
export class EventsCardComponent {
@Input() cardColor: String ="light blue";
cardColors=["light blue","light green","light yellow","light red"];

constructor(private service:ApiService,private router:Router){}

events?: Event[];
  
  ngOnInit(): void {
    this.getAllEvents();
  
  }
  
  
  getAllEvents() {
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data;      
      
  } );
}

eventDetail(id1:any){
  this.router.navigate(['/event-detail'], { queryParams: { id: id1 } });

}
}



