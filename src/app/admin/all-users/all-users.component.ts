import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // MatTableModule'ü içe aktarın
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { ShowDialogComponent } from '../components/show-dialog/show-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../model/dialogdata';






@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],

})

export class AllUsersComponent {

  constructor(private router: Router, private service: ApiService,private matDialog:MatDialog ) {
   
  }

searchFilter?:number=0;
roleFilter?:number=3;
  users?: User[];
tempUsers?: User[];
  searchItem?: string;
  ngOnInit(): void {

    this.LoadUsers();
  }

  LoadUsers() {
    this.service.getAllEntities(User).subscribe((res) => {
      switch(this.searchFilter){
        case 0:
          this.tempUsers = res.data;
          break;
        case 1:
          this.tempUsers = this.searchItem ==undefined ? res.data : res.data.filter((x: User) =>
        x.id?.toString().toLowerCase().includes(this.searchItem?.toLowerCase() as string)

      );
          break;
        case 2:
          this.tempUsers = this.searchItem ==undefined ? res.data : res.data.filter((x: User) =>
        x.fullName?.toString().toLowerCase().includes(this.searchItem?.toLowerCase() as string)

      );
          break;
        case 3:
          this.tempUsers = this.searchItem ==undefined ? res.data : res.data.filter((x: User) =>
        x.email?.toString().toLowerCase().includes(this.searchItem?.toLowerCase() as string)

      );
          break;
        
      }
      this.users = this.roleFilter==3 ? this.tempUsers : this.tempUsers?.filter((x: User) =>
        x.userType==this.roleFilter
      );
      console.log(this.users);
    });


  }
  openDialog(id?: number) {
    
     
    if(id!=null){
      this.matDialog.open(ShowDialogComponent, {
        position: {
          top: '24vh',
          left: '40vw'
      },
        width: '300px',
        data: new DialogData(
          "Kullanıcı Silme",
          "Kullanıcı silinecek emin misiniz?",
          id,
          User,
           
        ),
      });
      this.matDialog.afterAllClosed.subscribe((res) => {
  
        this.LoadUsers();
      });
      
    }else{

    }
  }
  RefleshUsers() {

    this.LoadUsers();
    
  }
  roleFilterSelectedItem(){
    document.getElementById("roleFilter")?.addEventListener("change", (event) => {
      this.roleFilter = Number((event.target as HTMLInputElement).value);
      this.LoadUsers(); 
      console.log(this.roleFilter);
    });
  }
  searchFilterSelectedItem(){
    document.getElementById("searchFilter")?.addEventListener("change", (event) => {
      this.searchFilter = Number((event.target as HTMLInputElement).value);
      this.searchItem=undefined;
      this.LoadUsers(); 
      console.log(this.searchFilter);
    });
  }

}

