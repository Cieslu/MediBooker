import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';


@Injectable({
  providedIn: 'root'
})


export class auth implements CanActivate {
  constructor(private account: AccountService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.account.checkIsLoggedIn() == false) {
      this.router.navigate(['/login']);
    }

    return true;
  }

  // confirmProfile(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (localStorage.getItem('confirmProfile') == "False") {
  //     this.router.navigate(['/editProfile']);
  //   }
  //   return true;
  // }
}

