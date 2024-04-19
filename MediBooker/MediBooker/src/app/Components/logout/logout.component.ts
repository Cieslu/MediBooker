import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private router: Router, private accout: AccountService, private route: ActivatedRoute) {}

  ngOnInit() {
    localStorage.removeItem('userName');
    localStorage.removeItem('BearerToken');
    localStorage.removeItem('BearerTokenExp');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('confirmProfile');
    localStorage.removeItem('name');
    localStorage.removeItem('userImg');
    this.accout.isLoggedIn = false;
    this.accout.roleName = '';
    this.accout.userLoggedStatus.next(false);

    const paramEdit = this.route.snapshot.queryParamMap.get('firstEdit');
    if(paramEdit === 'true') {
      this.router.navigate(['/login'], {queryParams: { firstEdit: true} });
    } else {
      this.router.navigate(['/home']);
    }
  }

}
