import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { ApiService } from 'src/core/services/api/api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginRequest: LoginRequest = <LoginRequest>{};
  public registerRequest: RegisterRequest = <RegisterRequest>{};
  public rePassword: string = '';
  public passwordResponse:string='';
  
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly apiService:ApiService
    
  
  ) { 
    console.log("login component çalıştı");
  }

  selectedImage: File | null = null;

  ngOnInit(): void {
  }

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['admin-profile']);
    } else if (status == ResponseStatus.Invalid) {
      this.loginRequest.password = '';

    }
  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];

  }
  uploadProfileImage() {
    
    if (this.selectedImage) {
      const selectedImageCopy: File = new File([this.selectedImage], this.registerRequest.email + '.jpeg', {
        type: this.selectedImage.type,
      });
      this.selectedImage = selectedImageCopy;
      
      this.apiService.uploadProfileImage(this.selectedImage).subscribe(
        (response) => {
          // Yükleme başarılı
          console.log('Resim yükleme başarılı:', response);

          // Profil resmi ile ilgili başka işlemleri yapabilirsiniz
        },
        (error) => {
          // Yükleme sırasında hata oluştu
          console.error('Resim yükleme hatası:', error);
        }
      );
    } else {
      // Resim seçilmedi
      console.error('Lütfen bir resim seçin.');
    }
  }

 
  async register() {
    if(this.rePassword==this.registerRequest.password || this.selectedImage!=null){

   
    let selectedValue: string = '';

    //Cinsiyet seçenekleri için HTML'den alınan değeri registerRequest nesnesine atayın
    const maleRadioButton = document.querySelector('input[name="IsMale"]:checked') as HTMLInputElement;
        selectedValue = maleRadioButton.value;
        
    if (selectedValue == 'true')
      this.registerRequest.isMale = true;
    else if (selectedValue == 'false')
      this.registerRequest.isMale = false;
  
      
    
      this.uploadProfileImage();
      this.registerRequest.imagePath="http://localhost:5258/api/Image/GetImage?resimKimlik="+this.registerRequest.email+'.jpeg';  
   
  
   
    let status = await this.authService.register(this.registerRequest);
    if (status==ResponseStatus.Ok) {
      

      await this.router.navigate(['/login']);
      location.reload();
    } else if (status == ResponseStatus.Invalid)
      this.registerRequest.password = '';
      this.passwordResponse='';

    }
    else{
      this.passwordResponse="Şifreler uyuşmuyor veya resim eklenemedi.";
    }

  }
}

