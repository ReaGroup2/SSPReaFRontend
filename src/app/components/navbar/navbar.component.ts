import { Component } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService:AuthService) { }
  currentUser:User  | null = null;
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user=>{
        this.currentUser=user;
    });

  }
  logout(){
    console.log("logout çalıştı");  
    this.authService.logOut();
    console.log(this.currentUser);
  }
}
