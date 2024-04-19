import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Reservation } from 'src/app/Models/Reservation';
import { DayDTO } from 'src/app/ModelsDTO/DayDTO';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { ReservationDTO } from 'src/app/ModelsDTO/ReservationDTO';
import { AccountService } from 'src/app/Services/account.service';
import { UserService } from 'src/app/Services/user.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservation: Reservation = new Reservation('','','','','',0);
  reservateDay!: DayDTO;
  selectedDoctor!: DoctorDTO;
  env: string = environment.serverAddress;

  pattern: string = "[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]*";

  constructor(private user: UserService, public worker: WorkerService, private router: Router, private route: ActivatedRoute, private account: AccountService) {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.worker.loadDay(parseInt(id)).subscribe({
      next: (res:DayDTO) => {
        this.reservateDay = res;

        this.account.getDoctor(this.reservateDay.idDoctor).subscribe({
          next: (doctor: DoctorDTO) => {
            this.selectedDoctor = doctor;
          }
        });
      }
    });
  }

  sendForm() {
    if(this.reservation.name != '' && this.reservation.lastName != '' && this.reservation.dateOfBirth != '' && this.reservation.email != '' && this.reservation.phoneNumber != ''){
      this.reservation.scheduleId = parseInt(this.route.snapshot.paramMap.get('id')!);
      console.log(this.reservation);
      this.user.createReservation(this.reservation).subscribe({
        next: res => this.router.navigate(['/confirmReservation']),
        error: res => alert("Rejestracja wizyty niepowiodła się!")
      })
    }
  }
}
