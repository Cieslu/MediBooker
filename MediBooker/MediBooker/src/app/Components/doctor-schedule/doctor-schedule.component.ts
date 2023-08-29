import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/Models/Day';
import { Doctor } from 'src/app/Models/Doctor';
import { DayDTO } from 'src/app/ModelsDTO/DayDTO';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { AccountService } from 'src/app/Services/account.service';
import { WorkerService } from 'src/app/Services/worker.service';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.css']
})
export class DoctorScheduleComponent implements OnInit {
  listDoctors: Doctor[] = [];
  listDays: Day[] = [];

  searchDoctorList: Doctor[] = []; //lista do wyszukiwania powiązana z widokiem
  searchDaysList: Day[] = [];
  tableList: Day[] = [];

  isDoctorChoosen: boolean = true;
  choosenDoctorId: string = '';
  choosenDoctorName: string = '';
  choosenDoctorImg: string = '';

  isDateChoosen: boolean = true;
  choosenDate: string = '';
  searchDoctor: string = '';

  deleteingDay: number = 0;
  isDeletingUser: boolean = false;

  serverURL: string = environment.serverAddress;

  hideButton: boolean = false;

  constructor(public worker: WorkerService, private account: AccountService) {
    this.account.countToasts = [];
    this.account.toastEditInfo = false;
    this.account.toastDeleteInfo = false;
    this.account.toastPasswordInfo = false;
    this.account.toastCreateSchedule = false;
    this.account.toastDeleteHours = false;
  }

  ngOnInit() {
    this.worker.getListDoctors().subscribe({
      next: (doctors: [DoctorDTO]) => {
        this.listDoctors = doctors.map(x => this.worker.mapToDoctor(x));
      }
    });
    this.worker.loadDays().subscribe({
      next: (days: [DayDTO]) => {
        this.listDays = days.map(x => this.worker.mapToDayDTO(x));
      }
    });
  }

  findDoctor(name: string) {
    if (name == '') {
      this.searchDoctorList = [];
      this.isDoctorChoosen = true;
      this.choosenDoctorId = '';
      this.isDateChoosen = true;
      this.choosenDate = '';
    } else {
      this.searchDoctorList = this.listDoctors.filter(x => (x.name!.toLowerCase() + ' ' + x.surname!.toLowerCase()).includes(name.toLowerCase()));
      this.isDoctorChoosen = false;
      this.isDateChoosen = true;
      this.choosenDate = '';
    }
  }

  findDate() {
    this.hideButton = !this.hideButton
    this.searchDaysList = [];
    this.isDateChoosen = true;

    this.listDays.forEach((day: Day) => {
      if (day.idDoctor == this.choosenDoctorId && !this.searchDaysList.some((_day: Day) => _day.date === day.date)) {
        this.searchDaysList.push(day);
      }
    });
    this.isDateChoosen = false;

  }

  chooseDoctor(doctor: Doctor) {
    this.isDoctorChoosen = true;
    this.choosenDoctorId = doctor.id;
    this.searchDoctor = doctor.name + ' ' + doctor.surname;
    this.choosenDoctorName = doctor.name + ' ' + doctor.surname;
    this.choosenDoctorImg = doctor.userImg!;
    this.searchDoctorList = [];
    // this.searchDaysList = this.listDays.filter(x => x.idDoctor = this.choosenDoctorId);
    console.log(this.listDays.filter(x => x.idDoctor == this.choosenDoctorId))
  }

  chooseDay(day: Day) {
    this.isDateChoosen = true;
    this.searchDaysList = [];
    this.choosenDate = day.date;
    this.tableList = this.listDays.filter(x => x.idDoctor == this.choosenDoctorId && x.date == day.date);
  }

  deleteDay(dayId: number) {
    this.worker.deleteDay(dayId).subscribe({
      next: (res) => {
        this.account.toastDeleteHours = true;
        this.account.countToasts.push(1);
        this.tableList = this.tableList.filter(x => x.id != dayId);
      }
    });
  }
}
