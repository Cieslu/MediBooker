import { Component } from '@angular/core';
import { CalendarDay } from 'src/app/Models/CalendarDay';
import { DayDTO } from 'src/app/ModelsDTO/DayDTO';
import { UserService } from 'src/app/Services/user.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { environment } from 'src/app/environment';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { Doctor } from 'src/app/Models/Doctor';
import { Day } from 'src/app/Models/Day';
import { infoReservation } from 'src/app/Models/infoReservation';
import { ReservationDTO } from 'src/app/ModelsDTO/ReservationDTO';
import { AccountService } from 'src/app/Services/account.service';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-doctor',
  templateUrl: './schedule-doctor.component.html',
  styleUrls: ['./schedule-doctor.component.css']
})
export class ScheduleDoctorComponent {
  environmentSchedule: String = environment.serverAddress;
  idDoctor!: string;
  doctorInfo!: Doctor;
  doctorDays: Day[] = [];
  schedule: CalendarDay[] = [];
  isSidePanel: boolean = false;
  currentDate: string;

  events: any = [];
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin
    ],
    locale: 'pl',
    firstDay: 1,
    buttonText: {
      today: 'Aktualna data',
    },
    eventMouseEnter: function (info) {
      info.el.style.cursor = 'pointer';
    },
    eventClick: this.handleDateClick.bind(this),
  }

  constructor(private worker: WorkerService, private doctor: DoctorService, private account: AccountService, private route: Router) {
    this.idDoctor = localStorage.getItem('userId')!;

    this.account.getDoctor(this.idDoctor).subscribe({
      next: (res: DoctorDTO) => {
        this.doctorInfo = this.account.mapToDoctor(res);
      }
    })


    const date = new Date();
    this.currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  ngOnInit() {
    this.doctor.loadDoctorSchedule(this.idDoctor).subscribe({
      next: (res: [DayDTO]) => {
        res.map(x => {
          this.schedule.push(new CalendarDay(x.idDoctor, this.doctorInfo.name!, this.doctorInfo.surname!, x.date))
          this.doctorDays.push(this.worker.mapToDay(x));
        }),

          this.schedule.forEach((day: CalendarDay) => {
            if (!this.events.some((_day: CalendarDay) => _day.start === day.start)) {
              // if (Date.parse(this.currentDate) < Date.parse(day.start)) {
              //   this.events.push(day);
              // }
              this.events.push(day);
            }
          });

        this.calendarOptions = {
          initialView: 'dayGridMonth',
          events: this.events
        };
      }
    })
  }

  handleDateClick(arg: any) {
    this.isSidePanel = true;
    const date = new Date(arg.event.start);

    let yearDate = date.getFullYear().toString();
    let monthDate = (date.getMonth()+1).toString();
    let dayDate = date.getDate().toString();
    
    if(monthDate.toString().length == 1){
      monthDate = '0'+monthDate;
    }
    
    if(dayDate.toString().length == 1){
      dayDate = '0'+dayDate;
    }
    
    const formatDate = yearDate +'-'+ monthDate +'-'+ dayDate ;

    this.route.navigate([`/reservationDetails/${this.idDoctor}/${formatDate}`])
  }
}