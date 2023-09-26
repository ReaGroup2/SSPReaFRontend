import { Component } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isSidebarActive = false;
  activeLinkIndex = -1; // Başlangıçta hiçbir bağlantı seçili değil

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    
  
    
    if (this.isSidebarActive) {
      sidebar.style.left = '0'; // Sidebar'ı sola doğru getir
    } else {
      sidebar.style.left = '-200px'; // Sidebar'ı sola doğru kaydır
    }

  }
}

