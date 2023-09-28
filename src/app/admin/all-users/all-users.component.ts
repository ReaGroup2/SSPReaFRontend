import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // MatTableModule'ü içe aktarın
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { MasterserviceService } from 'src/app/masterservice.service';
import { DataTablesModule } from 'angular-datatables';
import { User } from './user';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],

})

export class AllUsersComponent {
  Invoiceheader: any;




  
  ngOnInit(): void {
    
    this.LoadInvoice();
  }

  LoadInvoice() {
    this.Invoiceheader = [
      new User(1, 'John Doe', 'johndoe@example.com', '123-456-7890', 'User'),
      new User(2, 'Jane Smith', 'janesmith@example.com', '987-654-3210', 'Admin'),
      new User(3, 'Alice Johnson', 'alice@example.com', '555-555-5555', 'User'),
      new User(4, 'Bob Brown', 'bob@example.com', '111-222-3333', 'Admin'),
      new User(5, 'Eve Wilson', 'eve@example.com', '777-888-9999', 'User')
   ];
 
}}

