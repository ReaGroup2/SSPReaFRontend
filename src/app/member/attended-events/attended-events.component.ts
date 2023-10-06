import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';

import { EventParticipant } from 'src/core/models/eventParticipant.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-attended-events',
  templateUrl: './attended-events.component.html',
  styleUrls: ['./attended-events.component.css']
})
export class AttendedEventsComponent {

  constructor(private router: Router, private service: ApiService) {}
  id?:number;
  myEvents?:EventParticipant[];
  ngOnInit(): void {
     this.service.getProfileInfo().subscribe(user=>this.id=user.data.id);
    this.getMyEvents();
    
   
  }

  
  getMyEvents() {
    this.service.getAllEntities(EventParticipant).subscribe((response) => {
      this.myEvents = response.data.filter(f=>f.userId==this.id);      
       console.log(this.myEvents);
       console.log("çalıştı");
    });
  }

  cancelParticipant(id:any){
    const confirmDelete = window.confirm("Etkinlik katılımını iptal etmek istiyor musunuz?");
    if(confirmDelete){

   
let status=this.service.deleteEntity(id,EventParticipant);

status.then(response=>{
  if (response?.status == ResponseStatus.Ok) {
    window.alert('Etkinliği katılım iptal edildi')
    this.getMyEvents();
  
  }
  else{
    window.alert('bir hata oluştu tekrar deneyin')
  }
})

  }
}

}
