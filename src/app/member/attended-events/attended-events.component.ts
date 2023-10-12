import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';
import { EventParticipant } from 'src/core/models/eventParticipant.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { Category } from 'src/core/models/category.model';
import { EventRequest } from 'src/core/models/request/event-request.model';






@Component({
  selector: 'app-attended-events',
  templateUrl: './attended-events.component.html',
  styleUrls: ['./attended-events.component.css']
})
export class AttendedEventsComponent implements OnInit {



  startDate: string | undefined;
  finishDate: string | undefined;
  text?: string;
  id?: number;
  myEvents?: EventParticipant[];
  newEvent?: Event;
  allCategories?: Category[];
  selectedCategory?: Category;
  eventRequest?: EventRequest;
  selectedImage: File | null = null;

  constructor(private router: Router, private service: ApiService) {
    this.eventRequest = new EventRequest();

  }

  ngOnInit(): void {
    this.getAllCategories();
    this.service.getProfileInfo().subscribe(user => this.id = user.data.id);
    this.getMyEvents();
    this.categorySelectedItem();



  }
  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }
  async uploadProfileImage(text?: string) {


    if (this.selectedImage) {
      const selectedImageCopy: File = new File([this.selectedImage], this.text + '.jpeg', {
        type: this.selectedImage.type,
      });
      this.selectedImage = selectedImageCopy;

      await this.service.uploadProfileImage(this.selectedImage).subscribe(
        (response) => {
          // Yükleme başarılı
          console.log('Resim yükleme başarılı:', response);

          // Profil resmi ile ilgili başka işlemleri yapabilirsiniz
        },
        (error) => {
          // Yükleme sırasında hata oluştu
          console.error('Resim yükleme hatası:', error);
        }
      );
    } else {
      // Resim seçilmedi
      console.error('Lütfen bir resim seçin.');
    }
  }
  onSubmit(customerData: any): void {
    console.log(customerData.title);
  }

  getAllCategories() {
    this.service.getAllEntities(Category).subscribe((respose) => {
      this.allCategories = respose.data;
      console.log(this.allCategories);
      console.log("kategori listesi")
    })
  }
  getMyEvents() {
    this.service.getAllEntities(EventParticipant).subscribe((response) => {
      this.myEvents = response.data.filter(f => f.userId == this.id);
      console.log(this.myEvents);
      console.log("çalıştı");
    });
  }

  cancelParticipant(id: any) {
    const confirmDelete = window.confirm("Etkinlik katılımını iptal etmek istiyor musunuz?");
    if (confirmDelete) {


      let status = this.service.deleteEntity(id, EventParticipant);

      status.then(response => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('Etkinliği katılım iptal edildi')
          this.getMyEvents();

        }
        else {
          window.alert('bir hata oluştu tekrar deneyin')
        }
      })

    }
  }
  showModal = false;
  openModal() {
    this.getAllCategories();
    this.categorySelectedItem();
    this.createEvent();
    this.showModal = true;


  }
  closeModal() {
    this.showModal = false;
  }
  createEvent() {

    this.service.getProfileInfo().subscribe(user => {
      this.eventRequest!.creatorId = user.data.id;
    })
    this.text = this.eventRequest?.categoryId + '_' + this.eventRequest?.creatorId + '_' + this.eventRequest?.title?.substring(0, 20);

    /*this.eventRequest!.isActive=true;*/
    this.eventRequest!.imagePath = this.text;
    /*2023-10-04T14:27:51.199Z*/
    /*
    this.eventRequest!.startDate=new Date(this.startDate!);
    this.eventRequest!.finishDate=new Date(this.finishDate!);*/
    this.uploadProfileImage(this.text);
    //console.log(this.eventRequest);
    console.log(this.eventRequest)
    let status =  this.service.createEntity(this.eventRequest!, "Event");
    status.then(response => {
      if (response?.status == ResponseStatus.Ok) {
        window.alert('etkinlik eklendi')
        this.getAllCategories();
      }
      else {
        window.alert('etkinlik eklerken bir hata oluştu')
      }
    })
    this.closeModal();
    this.getMyEvents();

    // console.log(this.eventRequest);
  }
  categorySelectedItem() {

    document.getElementById("categoryOptions")?.addEventListener("click", (event) => {
      this.eventRequest!.categoryId = Number((event.target as HTMLInputElement).value);

      //console.log(this.eventRequest?.categoryId +"change");
    });


  }

}

