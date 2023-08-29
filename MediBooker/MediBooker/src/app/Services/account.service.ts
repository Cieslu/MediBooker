import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenInfoDTO } from '../ModelsDTO/TokenInfoDTO';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { LoginDTO } from '../ModelsDTO/LoginDTO';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { DoctorDTO } from '../ModelsDTO/DoctorDTO';
import { requestCreateUser } from '../ModelsDTO/requestCreateUserDTO';
import { WorkerDTO } from '../ModelsDTO/WorkerDTO';
import { User } from '../Models/User';
import { Doctor } from '../Models/Doctor';
import { Worker } from '../Models/Worker';
import { ChangePasswordDTO } from '../ModelsDTO/ChangePasswordDTO';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isLoggedIn: boolean = false;
  userName: string = '';
  roleName: string = '';

  userLoggedStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toastEditInfo: boolean = false;
  toastDeleteInfo: boolean = false;
  toastPasswordInfo: boolean = false;
  toastCreateSchedule: boolean = false;
  toastDeleteHours: boolean = false;

  countToasts: number[] = [];
  env: string = environment.serverAddress;

  constructor(private http: HttpClient) { }

  Login(login: LoginDTO): Observable<TokenInfoDTO> {
    return this.http.post<TokenInfoDTO>(`${this.env}api/Account/login`, login);
  }

  checkIsLoggedIn(): boolean {
    if(localStorage.getItem('userName')! && localStorage.getItem('BearerToken')) {
      this.checkRoleName();
      return true;
    } else {
      return false;
    }
  }

  checkRoleName() {
    if(localStorage.getItem('userName')! && localStorage.getItem('BearerToken')) {
      let name = localStorage.getItem('role')!;
      this.roleName = name;
    }
  }

  getUserId() {
    if(localStorage.getItem('userName')! && localStorage.getItem('BearerToken')) {
      let userId = localStorage.getItem('userId');
      return userId;
    } else {
      return null;
    }
  }

  firstEdit(profile: User, password: string): Observable<any> {
    console.log(profile);
    const formData = new FormData();

    formData.append("id", profile.id!);
    formData.append("name", profile.name!);
    formData.append("surname", profile.surname!);
    formData.append("image", '');
    formData.append("file", profile.file!);

    if(profile.getSpecialization() == null) {
      profile.setSpecialization('undefinded');
    }

    formData.append("specialization", profile.getSpecialization()!);
    formData.append("email", profile.email!);

    return this.http.put(`${this.env}api/Account/firstEditUser/${profile.id}/${password}`, formData);
  }

  createDoctor(email: string): Observable<DoctorDTO>{
    const user = new requestCreateUser(email);

    return this.http.post<DoctorDTO>(`${this.env}api/Moderator/CreateDoctor`, user);
  }

  createWorker(email: string): Observable<DoctorDTO>{
    const user = new requestCreateUser(email);

    return this.http.post<DoctorDTO>(`${this.env}api/Moderator/CreateWorker`, user);
  }

  putDoctor(profile: Doctor): Observable<DoctorDTO>{
    const formData = new FormData();

    formData.append("id", profile.id!);
    formData.append("name", profile.name!);
    formData.append("email", profile.email!);
    formData.append("surname", profile.surname!);
    formData.append("specialization", profile.getSpecialization()!);
    formData.append("image", '');
    formData.append("file", profile.file);

    return this.http.put<DoctorDTO>(`${this.env}api/Account/EditDoctor/${profile.id}`, formData);
  }

  putWorker(profile: Worker): Observable<WorkerDTO>{
    console.log(profile);
    const formData = new FormData();

    formData.append("id", profile.id!);
    formData.append("name", profile.name!);
    formData.append("email", profile.email!);
    formData.append("surname", profile.surname!);
    formData.append("image", '');
    formData.append("file", profile.file);

    return this.http.put<WorkerDTO>(`${this.env}api/Account/EditWorker/${profile.id}`, formData);
  }

  putModerator(profile: Worker): Observable<WorkerDTO>{
    console.log(profile);
    const formData = new FormData();

    formData.append("id", profile.id!);
    formData.append("name", profile.name!);
    formData.append("email", profile.email!);
    formData.append("surname", profile.surname!);
    formData.append("image", '');
    formData.append("file", profile.file);

    return this.http.put<WorkerDTO>(`${this.env}api/Moderator/EditModerator/${profile.id}`, formData);
  }

  putPassword(id:string | null | undefined, changePassword: ChangePasswordDTO | undefined): Observable<ChangePasswordDTO>{
    console.log(id)
    console.log(changePassword)
    return this.http.put<ChangePasswordDTO>(`${this.env}api/Account/ChangePassword/${id}`, changePassword);
  }

  deleteDoctor(id: string){
    return this.http.delete(`${this.env}api/Moderator/DeleteDoctor/${id}`);
  }

  deleteWorker(id: string){
    return this.http.delete(`${this.env}api/Moderator/DeleteWorker/${id}`);
  }

  getListDoctors(): Observable<[DoctorDTO]>{
    return this.http.get<[DoctorDTO]>(`${this.env}api/Account/LoadDoctors`).pipe(shareReplay());
  }

  getListWorkers(): Observable<[WorkerDTO]>{
    return this.http.get<[WorkerDTO]>(`${this.env}api/Account/LoadWorkers`).pipe(shareReplay());
  }

  getDoctor(id:string): Observable<DoctorDTO>{
    return this.http.get<DoctorDTO>(`${this.env}api/Account/LoadDoctor/${id}`).pipe(shareReplay());
  }

  getWorker(id:string): Observable<WorkerDTO>{
    return this.http.get<WorkerDTO>(`${this.env}api/Account/LoadWorker/${id}`).pipe(shareReplay());
  }

  getModerator(id:string): Observable<WorkerDTO>{
    return this.http.get<WorkerDTO>(`${this.env}api/Moderator/LoadModerator/${id}`).pipe(shareReplay());
  }



  mapToDoctor(doctor: DoctorDTO): Doctor{
    return new Doctor(doctor.id, doctor.name, doctor.surname, doctor.image, doctor.specialization, doctor.email, doctor.userImg)
  }

  mapToWorker(worker: WorkerDTO): Worker{
    return new Worker(worker.id, worker.name, worker.surname, worker.image, worker.email, worker.userImg);
  }

  mapToDoctorDTO(doctor: User, spec: string | null | undefined): DoctorDTO{
    return new DoctorDTO(doctor.id, doctor.name, doctor.surname, doctor.image, spec, doctor.email, doctor.file, doctor.userImg);
  }

  mapToWorkerDTO(worker: User): WorkerDTO{
    return new WorkerDTO(worker.id, worker.name, worker.surname, worker.image, worker.email, worker.file, worker.userImg);
  }
}
