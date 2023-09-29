import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // MatTableModule'ü içe aktarın
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';






@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],

})

export class AllUsersComponent {

  constructor(private router: Router, private service: ApiService,) {
   
  }


  users?: User[];
  searchItem?: string;
  ngOnInit(): void {

    this.LoadUsers();
  }

  LoadUsers() {
    this.service.getAllEntities(User).subscribe((res) => {
      this.users = this.searchItem ==null ? res.data : res.data.filter((x: User) => x.fullName?.toLowerCase().includes(this.searchItem!.toLowerCase()));
      console.log(this.users);
    });

  }
  RefleshUsers() {

    this.LoadUsers();
    
  }

}

