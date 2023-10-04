import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly apiService: ApiService,private readonly authService:AuthService) {}

  ngOnInit() {
    this.getUser();
  }

  
  getUser() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
      

      // this.users.filter(u => u.id === this.apiService.getProfileInfo(parseInt(u=>u.id)));
      console.log(this.users);
    });
  }
}
