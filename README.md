<div align="center">
  
# MediBooker

</div>

MediBooker 🧑‍⚕️ is your top choice for easy online scheduling of doctor appointments. With its user-friendly interface and helpful features, it makes booking appointments simple, ensuring a seamless experience for both doctors and patients.

## Contributors
- [0Ve3te](https://github.com/0Ve3te)

## Table Of Contents
1. ##### [Features](#features-1)
2. ##### [Technologies Used](#technologies-used-1)
3. ##### [Database](#database)
4. ##### [Application Overview](#application-overview)
    1. ##### [User Role](#user-role)
        1. ##### [Home Page](#home-page)
        2. ##### [Booking Appointment](#booking-appointment)
        3. ##### [Canceling Appointment](#canceling-appointment)
    2. ##### [Administrator Role](#administrator-role)
        1. ##### [Home Page](#home-page-1)
        2. ##### [Adding User](#adding-user)
        3. ##### [Users List](#users-list)
    3. ##### [Doctor Role](#doctor-role)
        1. ##### [First Logging In](#first-logging-in)
        2. ##### [Schedule](#schedule)
    4. ##### [Worker Role](#worker-role)
        1. ##### [Home Page](#home-page-2)
        2. ##### [First Logging In](#first-logging-in-1)
        3. ##### [Creating Schedule](#creating-schedule)
        4. ##### [Checking Schedule](#checking-schedule)
    5. ##### [The Notification](#the-notification)

# Features
- **User Roles:** 🧑‍⚕️ The application supports role-based access control with distinctions between doctors and staff members. Administrators have the authority to create accounts for both doctors and staff.
  
- **Doctor Scheduling:** 📅 Staff members can manage doctors' work schedules and set their working hours according to the needs.
  
- **Interactive Calendar:** 🗓️ Users can easily browse through an interactive calendar to choose the date and doctor they prefer for booking appointments.
  
- **Reservation Form:** ✍️ A simple yet user-friendly form makes it easy for users to schedule appointments.
  
- **Email Notifications:** 📧 The app sends users an email after they schedule an appointment, giving them an easy way to cancel if it's necessary.

- **Token Authentication:** 🔒 Security is paramount. The application utilizes token-based authentication to ensure secure access and data protection.
  
# Technologies Used
#### Backend:
- .NET 7.0,
  
- C#,
  
- Entity Framework Core,
  
- MSSQL.
  
#### Frontend:
- Angular 15,
  
- Typescript,
  
- Bootstrap 5.

# Database
<img src="/MediBooker_Photos/database.png" alt="database">

# Application Overview

## User Role

### Home Page
> This is the home page for users. Clients don't have to be logged in to use MediBooker.
<img src="/MediBooker_Photos/home_page.png" alt="home_page_user">

### Booking Appointment
> The calendar is used to book an appointment with the doctor.
<img src="/MediBooker_Photos/calendar.png" alt="calendar">

> This panel shows the available hours for the day that has been chosen after the doctor has been selected.
<div align="center">
<img src="/MediBooker_Photos/information_about_visit.png" alt="information_about_visit">
</div>

> The user has to complete the form.
<img src="/MediBooker_Photos/visit_reservation.png" alt="visit_reservation">

> Then the system shows the confirmation after the form has been correctly completed.
<img src="/MediBooker_Photos/visit_confirmation.png" alt="visit_confirmation">

> The email, which contains the visit details, is sent to the user
<div align="center">
<img src="/MediBooker_Photos/confirmation_mail.png" alt="confirmation_mail">
</div>

### Canceling Appointment
> The client can only cancel the visit one day before the scheduled date.
<img src="/MediBooker_Photos/canceling_visit.png" alt="canceling_visit">

## Administrator Role

### Home Page
> This is the home page for users who have the administrator role. They have additional features.
<img src="/MediBooker_Photos/home_page_admin.png" alt="home_page_admin">

### Adding User
> An administrator can add a user with the doctor or worker role.
<img src="/MediBooker_Photos/adding_doctor_or_worker.png" alt="adding_doctor_or_worker">

> The notification after adding a user. 
<img src="/MediBooker_Photos/added_doctor_or_worker.png" alt="added_doctor_or_worker">

> The email informs that a user has been added. This notice includes the username and password, which the user can to use log in.
<div align="center">
<img src="/MediBooker_Photos/added_doctor_or_worker_email.png" alt="added_doctor_or_worker_email">
</div>

### Users List
> The administrator has access to the users list.
<img src="/MediBooker_Photos/users_list.png" alt="users_list">

## Doctor Role

### Home Page
> This is the home page for users who have the doctor role. They have additional features.
<img src="/MediBooker_Photos/home_page_doctor.png" alt="home_page_doctor">

### First Logging In
> The doctor has to edit their profile when logging in for the first time.
<img src="/MediBooker_Photos/first_edit_doctor.png" alt="first_edit_doctor">

> The user will be logged out after the first edit.
<div align="center">
<img src="/MediBooker_Photos/after_first_edit.png" alt="after_first_edit">
</div>

### Schedule
> The doctor can check their own appointments on the calendar.
<img src="/MediBooker_Photos/doctor_schedule_1.png" alt="doctor_schedule_1">

> The details for the selected day.
<img src="/MediBooker_Photos/visit_list.png" alt="visit_list">

## Worker Role

### Home Page
> This is the home page for users who have the worker role. They have additional features.
<img src="/MediBooker_Photos/home_page_worker.png" alt="home_page_worker">

### First Logging In
> The worker has to edit their profile when logging in for the first time.
<img src="/MediBooker_Photos/first_edit_worker.png" alt="first_edit_worker">

> The user will be logged out after the first edit.
<div align="center">
<img src="/MediBooker_Photos/after_first_edit.png" alt="after_first_edit">
</div>

### Creating Schedule
> The worker creates a schedule for the doctors.
<img src="/MediBooker_Photos/creating_visit.png" alt="creating_visit">

### Checking Schedule
> The worker can check the doctor's schedule and can delete selected visits from the schedule.
<img src="/MediBooker_Photos/doctor_schedule_worker.png" alt="doctor_schedule_worker">

## The Notification
> Here is an example notification that is shown after each operation is completed.
<div align="center">
<img src="/MediBooker_Photos/notification_creating_visit.png" alt="notification_creating_visit">
</div>
