import { Component,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent {
  @Input() cardColor: String ="light blue";
cardColors=["light blue","light green","light yellow","light red"];
  id?:any;
  event?:Event;
  constructor(private route: ActivatedRoute,private apiService:ApiService) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      // Veriyi kullanabilirsiniz
    });
  }

  ngOnInit(): void {
    this.getEventById(this.id);
  }
  



  getEventById(id:any){
this.apiService.getEntityById(id,Event).then((response)=>{
  this.event=response?.data;

})

  }

}



// TypeScript ile seçilen tabı göster veya gizle
const tabs: NodeListOf<Element> = document.querySelectorAll('.tab-button');
const tabContents: NodeListOf<Element> =
  document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Tüm tabları gizle
    tabContents.forEach((content) => {
      content.classList.add('hidden');
    });

    // Tıklanan tabın içeriğini göster
    const targetId: string | null = tab.getAttribute('data-tabs-target');
    const targetContent: Element | null = document.querySelector(
      targetId || ''
    );
    if (targetContent) {
      targetContent.classList.remove('hidden');
    }
  });
});
