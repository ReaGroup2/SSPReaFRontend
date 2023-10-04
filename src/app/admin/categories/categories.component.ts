import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Category } from 'src/core/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowDialogComponent } from '../components/show-dialog/show-dialog.component';
import { DialogData } from '../model/dialogdata';

  

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  
})
export class CategoriesComponent {
  constructor(private router: Router, private service: ApiService,private matDialog:MatDialog) {}
  categories?: Category[];

  ngOnInit(): void {
    this.getAllCategories();
  }

  
  getAllCategories() {
    this.service.getAllEntities(Category).subscribe((response) => {
      this.categories = response.data;
      // console.log(this.categories);
    });
  }
  openDialog(id?: number) {
    
     
      if(id!=null){
        this.matDialog.open(ShowDialogComponent, {
          position: {
            top: '20vh',
            left: '40vw'
        },
          width: '300px',
          data: new DialogData(
            "Kategori Silme",
            "Kategori silinecek emin misiniz?",
            id,
            Category,
             
          ),
        });
        this.matDialog.afterAllClosed.subscribe((res) => {
  
          this.getAllCategories();
        });
      }else{

      }
      
    }
 
  
}
