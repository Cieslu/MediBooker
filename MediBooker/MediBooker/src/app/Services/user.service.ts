import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationDTO } from '../ModelsDTO/ReservationDTO';
import { Reservation } from '../Models/Reservation';
import { Observable, shareReplay } from 'rxjs';
import { DayDTO } from '../ModelsDTO/DayDTO';
import { Day } from '../Models/Day';
import { DoctorDTO } from '../ModelsDTO/DoctorDTO';
import { Doctor } from '../Models/Doctor';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  toastDeleteReservation: boolean = false;
  env: string = environment.serverAddress;


  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation): Observable<ReservationDTO>{
    return this.http.post<ReservationDTO>(`${this.env}api/Reservation/AddReservation`, this.mapToDTOReservation(reservation));
  }

  getReservations(): Observable<[ReservationDTO]>{
    return this.http.get<[ReservationDTO]>(`${this.env}api/Reservation/LoadReservations`).pipe(shareReplay());
  }

  getReservation(id: string): Observable<[ReservationDTO]>{
    return this.http.get<[ReservationDTO]>(`${this.env}api/Reservation/LoadReservation/${id}`).pipe(shareReplay());
  }

  deleteReservation(id: number){
    return this.http.delete(`${this.env}api/Reservation/DeleteReservation/${id}`);
  }

  loadDay(id: number): Observable<DayDTO>{
    return this.http.get<DayDTO>(`${this.env}api/Worker/LoadDay/${id}`).pipe(shareReplay());
  }

  getDoctor(id:string): Observable<DoctorDTO>{
    return this.http.get<DoctorDTO>(`${this.env}api/Account/LoadDoctor/${id}`).pipe(shareReplay());
  }

  checkHourFormat(str: string): boolean {
    const parts = str.split(":");
    return parts.length === 2 && parts[1].length === 1;
  }






  mapToDoctor(doctor: DoctorDTO): Doctor{
    return new Doctor(doctor.id, doctor.name, doctor.surname, doctor.image, doctor.specialization, doctor.email, doctor.userImg)
  }

  mapToReservation(reservation: ReservationDTO): Reservation{
    return new Reservation(reservation.name, reservation.lastName, reservation.dateOfBirth, reservation.email, reservation.phoneNumber.toString(), reservation.scheduleId);
  }

  mapToDTOReservation(reservation: Reservation): ReservationDTO{
    return new ReservationDTO(reservation.name, reservation.lastName, reservation.dateOfBirth, reservation.email, parseInt(reservation.phoneNumber), reservation.scheduleId);
  }

  mapToDay(day: DayDTO): Day{
    return new Day(day.id, day.idDoctor, day.date, day.hoursFrom, day.hoursTo);
  }

  mapToDayDTO(day: Day): DayDTO{
    return new DayDTO(day.id, day.idDoctor, day.date, day.hoursFrom, day.hoursTo);
  }
}
