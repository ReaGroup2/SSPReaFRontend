import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent {
  users: User[] = [];
  resimKimlik!: string;
  resimUrl!: string;
  selectedImage: File | null = null;

  constructor(private readonly apiService: ApiService,private readonly authService:AuthService,private readonly router:Router) {}
  currentUser?: User | null;
  ngOnInit() {
    this.apiService.getProfileInfo().subscribe(user=>{
      this.currentUser=user.data;
      console.log("imagepath:"+this.currentUser.imagePath);
    
  });
  }
  showModal = false;
  async updateUser() {
    this.currentUser!.imagePath="http://localhost:5258/api/Image/GetImage?resimKimlik="+this.currentUser!.email+'.jpeg';  
   
    let status=await this.apiService.updateEntity(this.currentUser!.id,this.currentUser,User);
    if(status?.status==ResponseStatus.Ok){
      await this.uploadProfileImage();
      
      alert("Güncelleme Başarılı");
     this.currentUser;
     
    }else{
      alert("Güncelleme Başarısız");
      this.authService.currentUser.subscribe(user=>{
        this.currentUser=user;});
    }
    
    this.closeModal();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    location.reload();
  }
onImageSelect(event: any) {
  this.selectedImage = event.target.files[0];

}
uploadProfileImage() {
  
  if (this.selectedImage) {
    const selectedImageCopy: File = new File([this.selectedImage], this.currentUser!.email + '.jpeg', {
      type: this.selectedImage.type,
    });
    this.selectedImage = selectedImageCopy;
    
    this.apiService.uploadProfileImage(this.selectedImage).subscribe(
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
 
}
