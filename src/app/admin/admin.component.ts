import { Component } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

constructor(private authService:AuthService) { }
  currentUser: User | null = null;
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user=>{
        this.currentUser=user;
    });
    const sidebar=document.querySelector('.sidebar')as HTMLElement;
    sidebar.classList.toggle('active');  
  }
  logout(){
    console.log("logout çalıştı");  
    this.authService.logOut();
    console.log(this.currentUser);
  }
  
 sidebarActive(){
  const btn=document.querySelector('#btn')as HTMLElement;
    
  const searchBtn=document.querySelector('.bx-serach')as HTMLElement;
    const sidebar=document.querySelector('.sidebar')as HTMLElement;
    sidebar.classList.toggle('active');     
}

}

