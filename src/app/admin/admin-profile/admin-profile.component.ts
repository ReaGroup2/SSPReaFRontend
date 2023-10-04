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

  constructor(private readonly apiService: ApiService,private readonly authService:AuthService,private readonly router:Router) {}
  currentUser?: User | null;
  ngOnInit() {
    this.authService.currentUser.subscribe(user=>{
      this.currentUser=user;
  });
  }
  showModal = false;
  async updateUser() {
    let status=await this.apiService.updateEntity(this.currentUser!.id,this.currentUser,User);
    if(status?.status==ResponseStatus.Ok){
      alert("Güncelleme Başarılı");
     this.currentUser;
     
    }else{
      alert("Güncelleme Başarısız");
      this.authService.currentUser.subscribe(user=>{
        this.currentUser=user;});
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
 
}
