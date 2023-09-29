import { Component } from '@angular/core';
import { EventParticipant } from 'src/core/models/eventParticipant.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-all-event-participant',
  templateUrl: './all-event-participant.component.html',
  styleUrls: ['./all-event-participant.component.css'],
})
export class AllEventParticipantComponent {
  eventParticipants?: EventParticipant[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.LoadEventParticipants();
  }

  LoadEventParticipants() {
    this.apiService.getAllEntities(EventParticipant).subscribe((res) => {
      this.eventParticipants = res.data;
    });
  }
}
