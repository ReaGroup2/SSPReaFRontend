import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';
import { EventParticipant } from 'src/core/models/eventParticipant.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { Category } from 'src/core/models/category.model';
import { EventRequest } from 'src/core/models/request/event-request.model';
import { User } from 'src/core/models/user.model';
import { CharacterService } from 'src/core/services/characterService';






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
  myAttendentEvents?:Event[];
  newEvent?: Event[];
  allCategories?: Category[];
  selectedCategory?: Category;
  eventRequest!: EventRequest;
  currentUser?:User;
  selectedImage: File | null = null;

  constructor(private router: Router, private service: ApiService) {
    this.eventRequest = new EventRequest();
    

  }

  ngOnInit() {
    this.getProfileInfo();
    this.getAllCategories();    
    this.getMyEvents();
    this.getCreatedEvents();
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
async getProfileInfo(){
  await this.service.getProfileInfo().subscribe((user) => {
    this.currentUser = user.data;
    // console.log('imagepath:' + this.currentUser.imagePath);
  });
}
  getAllCategories() {
    this.service.getAllEntities(Category).subscribe((respose) => {
      this.allCategories = respose.data;
      console.log(this.allCategories);
      console.log("kategori listesi")
    })
  }
  async getMyEvents() {
    await this.service.getAllEntities(EventParticipant).subscribe((response) => {
      this.myEvents = response.data.filter(f => f.userId == this.currentUser?.id);
      
      console.log(this.myEvents);
      console.log("çalıştı");
    });
  }
async getCreatedEvents(){
  await this.service.getAllEntities(Event).subscribe((res)=>{
    this.myAttendentEvents=res.data.filter(f=>f.creatorId==this.currentUser?.id)
  })
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
    this.text=CharacterService.TurkishCharacterFix(this.text);
    /*this.eventRequest!.isActive=true;*/
    this.eventRequest!.imagePath = this.text;
    this.eventRequest!.startDate=new Date(this.eventRequest!.startDate?.toString()+':00.000Z')
    this.eventRequest!.finishDate=new Date(this.eventRequest!.finishDate?.toString()+':00.000Z')
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
    this.getCreatedEvents();

    // console.log(this.eventRequest);
  }
  categorySelectedItem() {

    document.getElementById("categoryOptions")?.addEventListener("click", (event) => {
      this.eventRequest!.categoryId = Number((event.target as HTMLInputElement).value);

      //console.log(this.eventRequest?.categoryId +"change");
    });


  }

}

