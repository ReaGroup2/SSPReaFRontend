import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Event } from 'src/core/models/event.model';
import { Category } from 'src/core/models/category.model';

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
    this.getAllCategories();
  }
  findCategoryNameById(id: number) {
    return this.categories?.find((x) => x.id === id)?.categoryName;
  }
  getAllCategories() {
    this.service.getAllEntities(Category).subscribe((response) => {
      this.categories = response.data;   
       //console.log(this.events);
    });
  }
  getAllEvents() {
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data;      
       //console.log(this.events);
    });
  }
}
