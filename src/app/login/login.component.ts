import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ApiService } from 'src/core/services/api/api.service';
import { RegisterRequest } from 'src/core/models/request/register-request.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginRequest: LoginRequest = <LoginRequest>{};
  public registerRequest: RegisterRequest = <RegisterRequest>{};

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly apiService: ApiService,
  ) { }

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
    let selectedValue: string = '';

    //Cinsiyet seçenekleri için HTML'den alınan değeri registerRequest nesnesine atayın
    // const maleRadioButton = document.querySelector('input[name="IsMale"]:checked') as HTMLInputElement;



    //     selectedValue = maleRadioButton.value;


    // if (selectedValue == 'true')
    //   this.registerRequest.IsMale = true;
    // else if (selectedValue == 'false')
    //   this.registerRequest.IsMale = false;

    this.registerRequest.IsMale = true;
    this.registerRequest.Phone = '01234'
    this.registerRequest.ImagePath = 'string.jpg'
    let status = this.apiService.register(this.registerRequest);



  }
}

