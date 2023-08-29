import { getLocaleTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/Interceptors/AuthInterceptor';
import { LoginDTO } from 'src/app/ModelsDTO/LoginDTO';
import { AccountService } from 'src/app/Services/account.service';
import { DecodeTokenService } from 'src/app/Services/decode-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login:LoginDTO = new LoginDTO();
  isRedirectFromFirstEdit: boolean = false;
  isErrorLogin: boolean = false;

  ngOnInit() {
    const paramEdit = this.route.snapshot.queryParamMap.get('firstEdit');
    if (paramEdit === 'true') {
      this.isRedirectFromFirstEdit = true;
    }
  }

  constructor(private account: AccountService, private decode: DecodeTokenService, private router: Router, private route: ActivatedRoute){
    if(localStorage.getItem('BearerToken') && localStorage.getItem('userName')) {
      this.router.navigate(['/home']);
    }
  }

  Signin(){
    this.account.Login(this.login).subscribe(res => {
      localStorage.setItem(`BearerToken`, JSON.stringify(res));
      const decodeToken = this.decode.getDecodedAccessToken(res.accessToken);
      console.log(decodeToken);
      localStorage.setItem(`BearerTokenExp`, decodeToken.exp);
      localStorage.setItem(`role`, decodeToken.role);
      localStorage.setItem(`confirmProfile`, decodeToken.confirmProfile);
      localStorage.setItem(`userId`, decodeToken.nameIdentifier);

      if(decodeToken.confirmProfile == 'True') {
        localStorage.setItem(`userName`, decodeToken.name);
        localStorage.setItem(`userImg`, decodeToken.userImg);
      } else {
        localStorage.setItem(`userName`, decodeToken.userName);
      }

      this.account.isLoggedIn = true;
      this.account.userLoggedStatus.next(true);
      this.account.userName = localStorage.getItem('userName')!;
      this.router.navigate(['/home']);
    }, () => {
      this.isErrorLogin = true;
    });
  }
}
