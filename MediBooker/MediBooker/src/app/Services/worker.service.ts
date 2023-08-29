import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Day } from '../Models/Day';
import { DayDTO } from '../ModelsDTO/DayDTO';
import { Observable, shareReplay } from 'rxjs';
import { DoctorDTO } from '../ModelsDTO/DoctorDTO';
import { Doctor } from '../Models/Doctor';
import { User } from '../Models/User';
import { ReservationDTO } from '../ModelsDTO/ReservationDTO';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  env: string = environment.serverAddress;
  constructor(private http: HttpClient) { }

  createDay(day: Day): Observable<DayDTO>{
    return this.http.post<DayDTO>(`${this.env}api/Worker/CreateDay`, this.mapToDayDTO(day));
  }

  loadDays(): Observable<[DayDTO]>{
    return this.http.get<[DayDTO]>(`${this.env}api/Worker/LoadDay`).pipe(shareReplay());
  }

  loadDay(id: number): Observable<DayDTO>{
    return this.http.get<DayDTO>(`${this.env}api/Worker/LoadDay/${id}`).pipe(shareReplay());
  }

  getListDoctors(): Observable<[DoctorDTO]>{
    return this.http.get<[DoctorDTO]>(`${this.env}api/Account/LoadDoctors`).pipe(shareReplay());
  }

  getDoctorSchedule(id: string): Observable<[DayDTO]>{
    return this.http.get<[DayDTO]>(`${this.env}api/Worekr/LoadDoctorSchedule/${id}`).pipe(shareReplay());
  }

  deleteDay(id: number) {
    return this.http.delete(`${this.env}api/Worker/DeleteDay/${id}`).pipe(shareReplay());
  }




  mapToDay(day: DayDTO): Day{
    return new Day(day.id, day.idDoctor, day.date, day.hoursFrom, day.hoursTo);
  }

  mapToDayDTO(day: Day): DayDTO{
    return new DayDTO(day.id, day.idDoctor, day.date, day.hoursFrom, day.hoursTo);
  }

  mapToDoctor(doctor: DoctorDTO): Doctor{
    return new Doctor(doctor.id, doctor.name, doctor.surname, doctor.image, doctor.specialization, doctor.email, doctor.userImg)
  }

  mapToDoctorDTO(doctor: User, spec: string | null | undefined): DoctorDTO{
    return new DoctorDTO(doctor.id, doctor.name, doctor.surname, doctor.image, spec, doctor.email, doctor.file, doctor.userImg);
  }

  checkHourFormat(str: string): boolean {
    const parts = str.split(":");
    return parts.length === 2 && parts[1].length === 1;
  }
}
