import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Event } from 'src/core/models/event.model';
import { Category } from 'src/core/models/category.model';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {
  constructor(private router: Router, private service: ApiService) {}
showModal = false;
selectedEditEvent?: Event;
selectedCategory?:number;
  events?: Event[];
  categories?: Category[];
  ngOnInit(): void {
    this.getAllEvents();
  }
  
  openModal(event?:Event) {
    
    this.showModal=true;
    this.selectedEditEvent=event;
    this.selectedCategory=event?.categoryId;
    this.getAllCategories();
    this.selectCategoryOnModal();
  
  }
  closeModal() {
    this.showModal = false;
    this.getAllEvents();
    this.categories=[];
    this.selectedCategory=undefined;
    this.selectedEditEvent=undefined;
      }
  getAllEvents() {
  
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data.sort((a,b)=>a.id!-b.id!);    
      
      
  } );
  }
  async updateEvent(){
    
    this.selectedEditEvent!.categoryId=this.selectedCategory;
    let status=await this.service.updateEntity(this.selectedEditEvent!.id!,this.selectedEditEvent,Event);
    if(status?.status==ResponseStatus.Ok){
      alert("Güncelleme Başarılı");
      this.showModal=false;
      this.closeModal();
    }else{
      alert("Güncelleme Başarısız");
    }

  }
  selectCategoryOnModal(){
    document.getElementById("selectCategory")?.addEventListener("change", (event) => {
      this.selectedCategory = Number((event.target as HTMLInputElement).value);
    
      console.log(this.selectedCategory);
    });
  }
  getAllCategories() {
    this.service.getAllEntities(Category).subscribe((response) => {
      this.categories = response.data.sort((a,b)=>a.id!-b.id!);
      // console.log(this.categories);
    });
  }
  confirmDelete(id:any) {
    const confirmDelete = window.confirm("Silmek istiyor musunuz?");
    if(confirmDelete){
      let status= this.service.deleteEntity(id,Event);
status.then(response=>{
  if (response?.status == ResponseStatus.Ok) {
    window.alert('kategori silindi!')
  this.getAllEvents();
  }
  else{
    window.alert('silme işleminde hata oluştu')
  }
});
    }else{
      window.alert("Silme işlemi iptal edildi");
    }
  
}
openAddModal(){
  this.showModal=true;
  this.getAllCategories();
  this.selectedCategory=0;
}
}
