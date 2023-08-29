import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './Interceptors/AuthInterceptor';
import { ErrorComponent } from './Components/error/error.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { HomeComponent } from './Components/home/home.component';
import { InfoComponent } from './Components/info/info.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { ModalInfoComponent } from './Components/modal-info/modal-info.component';
import { ToastInfoComponent } from './Components/toast-info/toast-info.component';
import { CreateScheduleComponent } from './Components/create-schedule/create-schedule.component';
import { DoctorScheduleComponent } from './Components/doctor-schedule/doctor-schedule.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarSidePanelComponent } from './Components/calendar-side-panel/calendar-side-panel.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { ConfirmReservationComponent } from './Components/confirm-reservation/confirm-reservation.component';
import { DeleteReservationComponent } from './Components/delete-reservation/delete-reservation.component';
import { ScheduleDoctorComponent } from './Components/schedule-doctor/schedule-doctor.component';
import { ReservationDoctorModalComponent } from './Components/reservation-doctor-modal/reservation-doctor-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    LogoutComponent,
    EditProfileComponent,
    HomeComponent,
    InfoComponent,
    CreateUserComponent,
    UsersListComponent,
    ModalInfoComponent,
    ToastInfoComponent,
    CreateScheduleComponent,
    DoctorScheduleComponent,
    CalendarComponent,
    CalendarSidePanelComponent,
    ReservationComponent,
    ConfirmReservationComponent,
    DeleteReservationComponent,
    ScheduleDoctorComponent,
    ReservationDoctorModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
