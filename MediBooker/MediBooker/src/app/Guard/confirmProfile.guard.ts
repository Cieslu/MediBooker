import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';


@Injectable({
  providedIn: 'root'
})


export class confirmProfile implements CanActivate {
  constructor(private account: AccountService, private router: Router) { }


//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (this.account.checkIsLoggedIn() == false) {
//       this.router.navigate(['/login']);
//     }
//     return true;
//   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('confirmProfile') != "True") {
      this.router.navigate(['/editProfile']);
    }
    return true;
  }
}

