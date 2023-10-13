import { Component } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users:User[]=[];
  selectedUser?:User;
  currentUser?:User;
  constructor(private apiService:ApiService,private authService:AuthService){}
  title = 'SSPRea';
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user=>{
        this.currentUser=user as User;
    });
    this.getUsers();
  }
  showModal:boolean=false;  
  openModal(){
    this.showModal=true;
  }
  closeModal(){ 
    this.showModal=false;
  }
  getUsers(){
    this.apiService.getAllEntities(User).subscribe(data=>{
      this.users=data.data.filter(x=>x.id!=this.currentUser?.id);
      console.log(this.users);
    });
  }
  selectUser(user:User){
    this.selectedUser=user;

    console.log(this.selectedUser);
  }
 
}