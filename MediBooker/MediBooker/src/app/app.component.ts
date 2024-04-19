import { Component, OnInit } from '@angular/core';
import { AccountService } from './Services/account.service';
import { environment } from './environment';
import { UserService } from './Services/user.service';
import { WorkerService } from './Services/worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MediBooker';
  isLoggedIn: boolean = false;
  username: string = '';
  avatar!: string;
  userId: string = "";

  ngOnInit() {
    this.account.userLoggedStatus.subscribe({
      next: (res:boolean) => {
        if(res == true) {
          if(localStorage.getItem('confirmProfile')) {
            this.avatar = environment.serverAddress+localStorage.getItem('userImg')!;
            this.account.roleName = localStorage.getItem('role')!;
         }
        }
       }
    });
  }

  constructor(public account: AccountService, public user: UserService, public worker: WorkerService) {
    this.account.countToasts = [];
    this.account.toastEditInfo = false;
    this.account.toastDeleteInfo = false;
    this.account.toastPasswordInfo = false;
    this.account.toastCreateSchedule = false;
    this.account.toastDeleteHours = false;
    
    this.account.isLoggedIn = this.account.checkIsLoggedIn();
    if(this.account.isLoggedIn) {
      this.account.userName = localStorage.getItem('userName')!;
      this.userId = localStorage.getItem('userId')!;
      if(localStorage.getItem('confirmProfile')) {
        this.avatar = environment.serverAddress+localStorage.getItem('userImg')!;
      }
    }
  }
}
