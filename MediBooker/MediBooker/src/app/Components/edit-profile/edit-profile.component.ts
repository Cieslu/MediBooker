import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { shareReplay, timestamp } from 'rxjs';
import { Doctor } from 'src/app/Models/Doctor';
import { User } from 'src/app/Models/User';
import { Worker } from 'src/app/Models/Worker';
import { ChangePasswordDTO } from 'src/app/ModelsDTO/ChangePasswordDTO';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { WorkerDTO } from 'src/app/ModelsDTO/WorkerDTO';
import { AccountService } from 'src/app/Services/account.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  //profile: Doctor = new Doctor('0', '', '', [''], '', '');
  profile: User;
  pattern: string = "[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]*";
  isDoctor: Boolean = false;
  password: string = '';
  fieldTextType: boolean = false;
  fieldTextType1: boolean = false;
  fieldTextType2: boolean = false;

  extensionError: boolean = false;
  imageRequiredError: boolean = true;

  editUserId: string | null | undefined;
  idFormPasswordChange: boolean = false;
  userSpecialization: string | null | undefined = null;
  newPassword: ChangePasswordDTO = new ChangePasswordDTO("","","");
  isConfirmProfile: string = '';
  role: string = '';

  constructor(private account: AccountService, private router: Router, private route: ActivatedRoute) {
    this.account.countToasts = [];
    this.account.toastEditInfo = false;
    this.account.toastDeleteInfo = false;
    this.account.toastPasswordInfo = false;
    this.account.toastCreateSchedule = false;
    this.account.toastDeleteHours = false;

    this.editUserId = this.route.snapshot.paramMap.get('id');
    this.role = localStorage.getItem('role')!;
    this.isConfirmProfile = localStorage.getItem('confirmProfile')!;
    if(this.editUserId){
      if(this.role == 'Doctor'){
        this.account.getDoctor(this.editUserId).subscribe({
          next: (res:DoctorDTO) => {
            if(res != null){
              console.log(res), this.profile = this.account.mapToDoctor(res), this.userSpecialization = this.profile.getSpecialization()}
            },
          error: (err:Error) => {}
        });
      }

      if(this.role == 'Worker'){
        this.account.getWorker(this.editUserId).subscribe({
          next: (res:WorkerDTO) => {
            if(res != null){
              console.log(res), this.profile = this.account.mapToWorker(res)}
            },
          error: (err:Error) => {}
        });
      }

      if(this.role == 'Moderator'){
        this.account.getDoctor(this.editUserId).subscribe({
          next: (res:DoctorDTO) => {
            if(res != null){
              console.log(res), this.profile = this.account.mapToDoctor(res), this.userSpecialization = this.profile.getSpecialization()}
            },
          error: (err:Error) => {}
        });

        this.account.getWorker(this.editUserId).subscribe({
          next: (res:WorkerDTO) => {
            if(res != null){
              console.log(res), this.profile = this.account.mapToWorker(res)}
            },
          error: (err:Error) => {}
        });

        this.account.getModerator(this.editUserId).subscribe({
          next: (res:WorkerDTO) => {
            if(res != null){
              console.log(res), this.profile = this.account.mapToWorker(res)}
            },
          error: (err:Error) => {}
        });
      }
    }

    if (localStorage.getItem('role') == 'Doctor') {
      this.profile = new Doctor('0', '', '', [''], '', '', '');
      this.isDoctor = true;
    } else {
      //this.profile.specialization = '';
      this.profile = new Worker('0', '', '', [''], '','');
      this.profile.setSpecialization("");
    }
  }

  ngOnInit(){
  }

  oldPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    Validators.minLength(6)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    Validators.minLength(6)
  ]);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.name.split('.').pop() == 'png' || file.name.split('.').pop() == 'jpg') {
        this.profile.file = file;
        this.imageRequiredError = false;
        this.extensionError = false;
      } else {
        this.extensionError = true;
      }
    } else {
      this.imageRequiredError = true;
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  sendForm() {
    if (this.isDoctor) {
      if (this.profile.name && this.profile.surname && this.profile.email && this.profile.file && /*this.profile.specialization*/ this.userSpecialization && !this.passwordFormControl.errors) {
        console.log("xd");
        console.log(this.profile);
        this.profile.id = localStorage.getItem('userId')!;
        this.profile.image = '';
        this.profile.setSpecialization(this.userSpecialization);
        this.account.firstEdit(this.profile, this.password).subscribe({
          next: () => {
            this.router.navigate(['/logout'], { queryParams: { firstEdit: true } });
          },
          error: error => console.log(error)
        });
      }
    }
    else {
      if (this.profile.name && this.profile.surname && this.profile.email && this.profile.file && !this.passwordFormControl.errors) {
        this.profile.id = localStorage.getItem('userId')!;
        this.profile.image = '';
        //this.profile.specialization = null;
        //this.profile.setSpecialization(null);
        this.account.firstEdit(this.profile, this.password).subscribe({
          next: () => {
            this.router.navigate(['/logout'], { queryParams: { firstEdit: true } });
          },
          error: error => console.log(error)
        });
      }
    }

    if(this.editUserId){
      if (this.profile.name && this.profile.surname && this.profile.email && this.userSpecialization && this.profile.getSpecialization()) {
        this.profile.id = this.editUserId;
        this.profile.image = '';
        this.account.putDoctor(this.account.mapToDoctorDTO(this.profile, this.userSpecialization)).subscribe({
          next: () => {
            this.account.toastEditInfo = true,
            this.account.countToasts.push(1)
            if(this.role == 'Doctor'){
              this.router.navigate(['/logout'])
            }
            else if(this.role == 'Moderator'){
              this.router.navigate(['/usersList'])
            }
          },
          error: error => console.log(error)
        });
      }

      if (this.profile.name && this.profile.surname && this.profile.email && !this.profile.getSpecialization()) {
        this.profile.id = this.editUserId;
        this.profile.image = '';
        this.account.putWorker(this.account.mapToWorkerDTO(this.profile)).subscribe({
          next: (res) => {
            this.account.toastEditInfo = true,
            this.account.countToasts.push(1)
            if(this.role == 'Worker'){
              this.router.navigate(['/logout'])
            }
            else if(this.role == 'Moderator'){
              this.router.navigate(['/usersList'])
            }
          },
          error: error => console.log(error)
        });
      }

      if (this.role == 'Moderator' && this.profile.name && this.profile.surname && this.profile.email && !this.profile.getSpecialization()) {
        this.profile.id = this.editUserId;
        this.profile.image = '';
        this.account.putModerator(this.account.mapToWorkerDTO(this.profile)).subscribe({
          next: (res) => {
            this.account.toastEditInfo = true,
            this.account.countToasts.push(1),
            this.router.navigate(['/logout']);
          },
          error: error => console.log(error)
        });
      }
    }

    if(this.newPassword.currentPassword && this.newPassword.oldPassword && !this.passwordFormControl.errors && !this.oldPasswordFormControl.errors){
      this.account.putPassword(this.editUserId, this.newPassword).subscribe({
        next: () => {
          this.account.toastPasswordInfo = true;
        },
        error: error => {
          alert("Podałeś nieprawidłowe hasło lub hasło nie zawiera dużych liter, znaków specjalnych oraz cyfr!");
        }
      });
    }
  }

  // sendChangePassword(){
  //   this.account.putPassword(this.editUserId, this.newPassword);
  // }

}
