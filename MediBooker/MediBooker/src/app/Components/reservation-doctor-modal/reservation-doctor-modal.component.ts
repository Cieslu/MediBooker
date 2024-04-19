import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Day } from 'src/app/Models/Day';
import { Doctor } from 'src/app/Models/Doctor';
import { ReservationDetails } from 'src/app/Models/ReservationDetails';
import { DayDTO } from 'src/app/ModelsDTO/DayDTO';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { ReservationDTO } from 'src/app/ModelsDTO/ReservationDTO';
import { AccountService } from 'src/app/Services/account.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UserService } from 'src/app/Services/user.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-reservation-doctor-modal',
  templateUrl: './reservation-doctor-modal.component.html',
  styleUrls: ['./reservation-doctor-modal.component.css'],
})
export class ReservationDoctorModalComponent {
  idDoctor!: string;
  date!: string;
  reservations: ReservationDTO[] = [];
  doctorDays: Day[] = [];
  doctorInfo!: Doctor;
  environmentSchedule: String = environment.serverAddress;
  reservationDetails!: ReservationDetails;
  reservationDetailsTab: ReservationDetails[] = [];

  constructor(
    private router: ActivatedRoute,
    private doctor: DoctorService,
    private account: AccountService,
    public worker: WorkerService
  ) {
    this.idDoctor = this.router.snapshot.paramMap.get('id')!;
    this.date = this.router.snapshot.paramMap.get('date')!;

    this.doctor.loadDoctorReservations(this.idDoctor).subscribe({
      next: (res: [ReservationDTO]) => {
        res.map((x) => this.reservations.push(x)),
          this.account.getDoctor(this.idDoctor).subscribe({
            next: (res: DoctorDTO) => {
              this.doctorInfo = this.account.mapToDoctor(res);

              this.doctor.loadDoctorSchedule(this.idDoctor).subscribe({
                next: (res: [DayDTO]) => {
                  res.filter((x) => {
                    this.doctorDays.push(this.worker.mapToDay(x));
                  });
                  this.doctorDays = this.doctorDays.filter(
                    (x) => x.date == this.date
                  );
                 
                  this.doctorDays.forEach((y) => {
                      this.reservations.forEach((x) => {
                        if (this.reservations.length == 0) {
                          this.reservationDetails = new ReservationDetails(0, '', '', '', '', '', y.hoursFrom, y.hoursTo);
                          this.reservationDetailsTab.push(this.reservationDetails);
                        }
                        else {
                          if (x.scheduleId == y.id) {
                            console.log('git')
                            this.reservationDetails = new ReservationDetails(
                              0,
                              x.name,
                              x.lastName,
                              x.dateOfBirth,
                              x.email,
                              x.phoneNumber.toString(),
                              y.hoursFrom,
                              y.hoursTo
                            );
                            this.reservationDetailsTab.push(
                              this.reservationDetails
                            );
                            console.log(this.reservationDetails);
                          }
                          // else {
                          //   console.log('Nie git')
                          //   this.reservationDetails = new ReservationDetails(0, '', '', '', '', '', y.hoursFrom, y.hoursTo);
                          //   this.reservationDetailsTab.push(this.reservationDetails);
                          // }
                        }
                      });                 
                  });
                },
              });
            },
          });
      },
    });
  }
}
