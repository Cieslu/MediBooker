import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ErrorComponent } from './Components/error/error.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { auth } from './Guard/auth.guard';
import { confirmProfile } from './Guard/confirmProfile.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { moderatorRole } from './Guard/moderatorRole.guard';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { CreateScheduleComponent } from './Components/create-schedule/create-schedule.component';
import { DoctorScheduleComponent } from './Components/doctor-schedule/doctor-schedule.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { ConfirmReservationComponent } from './Components/confirm-reservation/confirm-reservation.component';
import { DeleteReservationComponent } from './Components/delete-reservation/delete-reservation.component';
import { ScheduleDoctorComponent } from './Components/schedule-doctor/schedule-doctor.component';
import { ReservationDoctorModalComponent } from './Components/reservation-doctor-modal/reservation-doctor-modal.component';
import { workerRole } from './Guard/workerRole.guard';
import { doctorRole } from './Guard/doctorRole.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path:"home", component: HomeComponent, title: 'Strona główna', canActivate: [auth]},
  {path:"home", component: HomeComponent, title: 'Strona główna'},
  {path:"login", component: LoginComponent, title:"Zaloguj się"},
  {path:'logout', component: LogoutComponent, title:"Wyloguj się", canActivate: [auth]},
  {path:'editProfile', component: EditProfileComponent, title:"Aktualizacja profilu", canActivate: [auth]},
  {path:'editProfile/:id', component: EditProfileComponent, title:"Edycja profilu", canActivate: [auth, confirmProfile]},
  {path:'usersList', component: UsersListComponent, title:"Lista użytkowników", canActivate: [auth, confirmProfile]},
  {path:'createSchedule', component: CreateScheduleComponent, title:"Stwórz grafik", canActivate: [auth, workerRole, confirmProfile]},
  {path:'schedules', component: DoctorScheduleComponent, title:"Grafik", canActivate: [auth, workerRole, confirmProfile]},
  {path:'calendar', component: CalendarComponent, title:"Kalendarz"},
  {path:'reservation/:id', component: ReservationComponent, title:"Rezerwacja wizyty"},
  {path:'confirmReservation', component: ConfirmReservationComponent, title:"Potwierdzenie wizyty"},
  {path:'deleteReservation/:idReservation/:idSchedule', component: DeleteReservationComponent, title:"Usunięcie wizyty"},
  {path:'scheduleDoctor', component: ScheduleDoctorComponent, title:"Grafik", canActivate: [auth, doctorRole, confirmProfile]},
  {path:'reservationDetails/:id/:date', component: ReservationDoctorModalComponent, title:"Rezerwacje"},



  {path:'createUser', component: CreateUserComponent, title:"Dodaj nowego użytkownika", canActivate: [auth, moderatorRole, confirmProfile]},

  {path:"error", component:ErrorComponent, title:"Błąd"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
