import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';



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
  
  ) { 
    console.log("login component çalıştı");
  }

  ngOnInit(): void {
  }

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['']);
    } else if (status == ResponseStatus.Invalid) {
      this.loginRequest.Password = '';

    }
  }

 
  async register() {
    if(this.rePassword==this.registerRequest.Password){

   
    let selectedValue: string = '';

    //Cinsiyet seçenekleri için HTML'den alınan değeri registerRequest nesnesine atayın
    const maleRadioButton = document.querySelector('input[name="IsMale"]:checked') as HTMLInputElement;
        selectedValue = maleRadioButton.value;
        
    if (selectedValue == 'true')
      this.registerRequest.IsMale = true;
    else if (selectedValue == 'false')
      this.registerRequest.IsMale = false;
  
      this.registerRequest.ImagePath='deneme';  
    

   
  
   
    let status = await this.authService.register(this.registerRequest);
    if (status==ResponseStatus.Ok) {
      await this.router.navigate(['/login']);
    } else if (status == ResponseStatus.Invalid)
      this.registerRequest.Password = '';
      this.passwordResponse='';

    }
    else{
      this.passwordResponse="Şifreler uyuşmuyor veya resim eklenemedi."
    }

  }
}

