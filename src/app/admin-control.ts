import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class adminControl implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // AuthService içindeki currentUser$ gözlemi ile kullanıcı bilgilerini kontrol edin.
    this.authService.currentUser.subscribe((user) => {
      if (user?.userType==0) {
        // Kullanıcı oturum açmışsa, rotaya erişim izni verin.
        return true;
      } else {
        // Kullanıcı oturum açmamışsa veya oturumu kapatmışsa, başka bir yere yönlendirin veya giriş sayfasına gönderin.
        this.router.navigate(['/error']);
        return false;
      }
    });

    return true; // Önceki abonelik tamamlanana kadar true döndürün.
  }
}