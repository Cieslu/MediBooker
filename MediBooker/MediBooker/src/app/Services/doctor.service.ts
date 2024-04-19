import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { DayDTO } from '../ModelsDTO/DayDTO';
import { ReservationDTO } from '../ModelsDTO/ReservationDTO';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  env: string = environment.serverAddress;


  loadDoctorSchedule(id: string): Observable<[DayDTO]>{
    return this.http.get<[DayDTO]>(`${this.env}api/Doctor/LoadDoctorSchedule/${id}`).pipe(shareReplay());
  }

  loadDoctorReservations(id: string): Observable<[ReservationDTO]>{
    return this.http.get<[ReservationDTO]>(`${this.env}api/Doctor/LoadDoctorReservation/${id}`).pipe(shareReplay());
  }

}
