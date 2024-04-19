import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Day } from 'src/app/Models/Day';
import { Doctor } from 'src/app/Models/Doctor';
import { Reservation } from 'src/app/Models/Reservation';
import { DayDTO } from 'src/app/ModelsDTO/DayDTO';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { ReservationDTO } from 'src/app/ModelsDTO/ReservationDTO';
import { AccountService } from 'src/app/Services/account.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent {
  reservationId!: number;
  scheduleId!: number;
  day!: Day;
  doctor!: Doctor;

  constructor(private user: UserService, private route: ActivatedRoute, private router: Router, private account: AccountService) {
    this.reservationId = Number(this.route.snapshot.paramMap.get('idReservation')!);
    this.scheduleId = Number(this.route.snapshot.paramMap.get('idSchedule')!);
    
    this.user.loadDay(this.scheduleId).subscribe({
      next: (res: DayDTO) => {
        this.day = this.user.mapToDay(res);

        if(this.user.checkHourFormat(this.day.hoursFrom)){
          this.day.hoursFrom = this.day.hoursFrom+'0';
        }

        if(this.user.checkHourFormat(this.day.hoursTo)){
          this.day.hoursTo = this.day.hoursTo+'0';
        }
        
        this.user.getDoctor(this.day.idDoctor).subscribe({
          next: (res: DoctorDTO) => {
            this.doctor = this.user.mapToDoctor(res);
          }
        })
      }
    })
  }

  deleteReservation() {
    this.user.deleteReservation(Number(this.reservationId)).subscribe({
      next: res => {
        this.user.toastDeleteReservation = true,
          this.account.countToasts.push(1),
          this.router.navigate(['/home'])
      }
    });
  }
}
