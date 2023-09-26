import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css']
})
export class EventsCardComponent {
@Input() cardColor: String ="light blue";
cardColors=["light blue","light green","light yellow","light red"];
}
