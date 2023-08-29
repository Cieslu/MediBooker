import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-toast-info',
  templateUrl: './toast-info.component.html',
  styleUrls: ['./toast-info.component.css']
})
export class ToastInfoComponent implements OnInit {

  time: string = "";
  @Input() bodyToast: string = "";

  constructor(private account: AccountService){

  }

  ngOnInit() {
    const time = new Date();
    let hours = time.getHours().toString();
    let minutes = time.getMinutes().toString();

    if (minutes.length == 1) {
      minutes = '0' + minutes;
    }

    if (hours.length == 1) {
      hours = '0' + hours;
    }

    this.time = hours.toString() + ":" + minutes.toString();
  }
}
