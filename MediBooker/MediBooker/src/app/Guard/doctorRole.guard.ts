import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';


@Injectable({
  providedIn: 'root'
})


export class doctorRole implements CanActivate {
  constructor(private account: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('role') != "Doctor") {
      this.router.navigate(['/home']);
    }
    return true;
  }
}

