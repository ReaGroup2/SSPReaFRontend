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
  
 
}

