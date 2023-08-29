import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Day } from 'src/app/Models/Day';
import { Doctor } from 'src/app/Models/Doctor';
import { DayDTO } from 'src/app/ModelsDTO/DayDTO';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { AccountService } from 'src/app/Services/account.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit{
  environmentSchedule: String = environment.serverAddress;
  listDoctors: Doctor[] = [];
  day: Day = new Day(0,'','','','');
  schedule: DayDTO[] = []; 
  
  doctor1: Doctor = new Doctor('','','','','','','');
  doctor2: Doctor = new Doctor('','','','','','','');
  doctor3: Doctor = new Doctor('','','','','','','');
  counter: number = 0;

  clickedId: string = '';
  hours: string[] = []
  hours2: string[] = []
  newHours: string[] = [];
  newHours2: string[] = [];
  dateIsOrdered: boolean = false;
  currentDate: string;
  wrongDate: boolean = false;

  isHourFrom: boolean = true;
  isHourTo: boolean = true;


  constructor(private worker: WorkerService, private account: AccountService){
    this.account.countToasts = [];
    this.account.toastEditInfo = false;
    this.account.toastDeleteInfo = false;
    this.account.toastPasswordInfo = false;
    this.account.toastCreateSchedule = false;
    this.account.toastDeleteHours = false;
    
    const date = new Date();
    this.currentDate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
  }

  ngOnInit(){
    this.worker.loadDays().subscribe({
      next: (res:[DayDTO]) => (console.log(res), res.map(x => this.schedule.push(this.worker.mapToDay(x))))
    })

    this.loadDoctors();
    for(let i=1; i<24; i++){
        this.hours.push(i+':00')
        this.hours.push(i+':30')
        this.hours2.push(i+':00')
        this.hours2.push(i+':30')
    }
  }

  loadDoctors(){
    this.worker.getListDoctors().subscribe({
      next: (res: DoctorDTO[]) => {console.log(res), res.map(x => 
        this.listDoctors.push(this.worker.mapToDoctor(x))),
        this.doctor1 = this.listDoctors[this.counter],
        this.doctor2 = this.listDoctors[this.counter+1],
        this.doctor3 = this.listDoctors[this.counter+2]
      },
      error: () => {}
    })
  }

  left(){
    if(this.counter-1 >= 0){
      this.counter-=1;
      this.doctor1 = this.listDoctors[this.counter]
      this.doctor2 = this.listDoctors[this.counter+1]
      this.doctor3 = this.listDoctors[this.counter+2]
    }
  }

  right(){
    if(this.counter+3 < this.listDoctors.length){
      this.counter+=1
      this.doctor1 = this.listDoctors[this.counter]
      this.doctor2 = this.listDoctors[this.counter+1]
      this.doctor3 = this.listDoctors[this.counter+2]
      console.log(this.counter)
    }
  }

  chooseDoctor(doctor: Doctor){
    this.clickedId = doctor.id;
  }

  listHours(hoursFrom: string){
    if(hoursFrom == ''){
      this.newHours = [];
    }
    else{
      this.isHourFrom = false;
      this.newHours = this.hours.filter(x => x.includes(hoursFrom));
      this.newHours.splice(5);
    }
  }

  listHours2(hoursTo: string){
    if(hoursTo == ''){
      this.newHours2 = [];
    }
    else{
      this.isHourTo = false;
      this.newHours2 = this.hours2.filter(x => x.includes(hoursTo) && parseInt(x)>parseInt(this.day.hoursFrom));
      this.newHours2.splice(5);
    }
  }

  saveStartHour(startHour: string){
    this.isHourFrom = true;
    this.day.hoursFrom = startHour;
    this.newHours = [];
  }

  saveEndHour(endHour: string){
    this.isHourTo = true;
    this.day.hoursTo = endHour;
    this.newHours2 = [];
  }

  checkDate(idDoctor: string, date: string){
    if(Date.parse(this.currentDate) > Date.parse(date)){
      this.wrongDate = true;
    }else{
      this.wrongDate = false;
      const filterSchedule = this.schedule.filter(x => x.idDoctor == idDoctor && x.date == date);
      if(filterSchedule.length != 0){
        this.dateIsOrdered = true;
      }
      else{
        this.dateIsOrdered = false;
      }
    }
  }

  createDay(){
    if(!this.dateIsOrdered && this.day.date && this.isHourFrom && this.isHourTo){
      this.day.idDoctor = this.clickedId;
      this. day.hoursFrom = this.day.hoursFrom.replace(':', ',')
      this. day.hoursTo = this.day.hoursTo.replace(':', ',')
  
      this.worker.createDay(this.day).subscribe({
        next: (res) => {
          this.account.toastCreateSchedule = true,
          this.account.countToasts.push(1)
          this.clickedId = '';
          this.day.date = '';
          this.day.idDoctor = '';
          this. day.hoursFrom = '';
          this. day.hoursTo = '';
        }
      });
    }
  }
}
