import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { WorkerService } from 'src/app/Services/worker.service';
import { DayDTO } from 'src/app/ModelsDTO/DayDTO';
import { Doctor } from 'src/app/Models/Doctor';
import { Day } from 'src/app/Models/Day';
import { environment } from 'src/app/environment';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { CalendarDay } from 'src/app/Models/CalendarDay';
import { filter } from 'rxjs';
import { infoReservation } from 'src/app/Models/infoReservation';
import { ReservationDTO } from 'src/app/ModelsDTO/ReservationDTO';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  environmentSchedule: String = environment.serverAddress;
  listDoctors: Doctor[] = [];
  schedule: CalendarDay[] = [];
  doctorDays: Day[] = [];
  doctorDays2: Day[] = [];
  infoReservation: infoReservation = new infoReservation('','',[],'','','','');


  doctor1: Doctor = new Doctor('', '', '', '', '', '', '');
  doctor2: Doctor = new Doctor('', '', '', '', '', '', '');
  doctor3: Doctor = new Doctor('', '', '', '', '', '', '');
  counter: number = 0;
  clickedId: string = '';
  isSidePanel: boolean = false;
  currentDate: string;
  listDoctorReservations: ReservationDTO[] = [];

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

  constructor(private worker: WorkerService, private user: UserService) { 
    const date = new Date();
    this.currentDate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
  }

  ngOnInit() {
    this.loadDoctors();

    this.worker.loadDays().subscribe({
      next: (res: [DayDTO]) => (
        res.map(x => {
          this.schedule.push(new CalendarDay(x.idDoctor, this.listDoctors.filter(y => x.idDoctor == y.id)[0].name!, this.listDoctors.filter(y => x.idDoctor == y.id)[0].surname!, x.date)),
          this.doctorDays.push(this.worker.mapToDay(x)),
          this.doctorDays2.push(this.worker.mapToDay(x))
        }))
    });
  }

  sidePanelHide(event: any) {
    this.isSidePanel = event;
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
    
    const formatDate = yearDate +'-'+ monthDate +'-'+ dayDate 
    
    let monthNames = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
    
    let day = date.getDate ();
    let month = monthNames[date.getMonth ()];
    let year = date.getFullYear ();
    let dateInWords = day + " " + month + " " + year;
    
    
    this.infoReservation.id = this.clickedId;
    this.infoReservation.data = dateInWords;

    this.doctorDays2 = this.doctorDays.filter(x => x.idDoctor == this.clickedId && x.date == formatDate);

    if(this.listDoctorReservations.length != 0){
      this.listDoctorReservations.forEach(y => {
        this.doctorDays2 = this.doctorDays2.filter(x => x.idDoctor == this.clickedId && x.date == formatDate && x.id != y.scheduleId);
      });
    }

    this.infoReservation.dayList = this.doctorDays2;
    this.infoReservation.doctor = this.listDoctors.filter(y => y.id == this.clickedId)[0].name! +' '+ this.listDoctors.filter(y => y.id == this.clickedId)[0].surname!;
    this.infoReservation.sprecialization = this.listDoctors.filter(y => y.id == this.clickedId)[0].specialization!;
    this.infoReservation.userImg = environment.serverAddress + this.listDoctors.filter(y => y.id == this.clickedId)[0].userImg!;
  }

  loadDoctors() {
    this.worker.getListDoctors().subscribe({
      next: (res: DoctorDTO[]) => {
        res.map(x =>
          this.listDoctors.push(this.worker.mapToDoctor(x))),
          this.doctor1 = this.listDoctors[this.counter],
          this.doctor2 = this.listDoctors[this.counter + 1],
          this.doctor3 = this.listDoctors[this.counter + 2]
      },
      error: () => { }
    })
  }

  left() {
    if (this.counter - 1 >= 0) {
      this.counter -= 1;
      this.doctor1 = this.listDoctors[this.counter]
      this.doctor2 = this.listDoctors[this.counter + 1]
      this.doctor3 = this.listDoctors[this.counter + 2]
    }
  }

  right() {
    if (this.counter + 3 < this.listDoctors.length) {
      this.counter += 1
      this.doctor1 = this.listDoctors[this.counter]
      this.doctor2 = this.listDoctors[this.counter + 1]
      this.doctor3 = this.listDoctors[this.counter + 2]
    }
  }

  chooseDoctor(doctor: Doctor) {
    this.isSidePanel = false;

    this.clickedId = doctor.id;
    this.events = [];

    this.schedule.forEach((day: CalendarDay) => {
      if (day.idDoctor == this.clickedId && !this.events.some((_day: CalendarDay) => _day.start === day.start)) {
        if(Date.parse(this.currentDate) < Date.parse(day.start)){
          this.events.push(day);       
        }     
      }
    });

    this.user.getReservation(this.clickedId).subscribe({
      next: (res:[ReservationDTO]) => (
        res.map(x => this.listDoctorReservations.push(x))
      )
    });

    console.log(this.events);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: this.events
    };
  }
}
