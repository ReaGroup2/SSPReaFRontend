import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Category } from 'src/core/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(private router: Router, private service: ApiService) {}

  categories?: Category[];

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getAllEntities(Category).subscribe((response) => {
      this.categories = response.data;
      // console.log(this.categories);
    });
  }
}
