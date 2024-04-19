import { Component, EventEmitter, Output } from '@angular/core';
import { Doctor } from 'src/app/Models/Doctor';
import { User } from 'src/app/Models/User';
import { Worker } from 'src/app/Models/Worker';
import { DoctorDTO } from 'src/app/ModelsDTO/DoctorDTO';
import { WorkerDTO } from 'src/app/ModelsDTO/WorkerDTO';
import { AccountService } from 'src/app/Services/account.service';import { environment } from 'src/app/environment';
;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  listUsers: User[] = [];
  deletingUser: string = "";
  isDeletingUser: boolean = false;
  serverAddress: string = environment.serverAddress;

  constructor(private account: AccountService) {
    this.account.getListDoctors().subscribe({
      next: (res: DoctorDTO[]) => { res.map(x => this.listUsers.push(this.account.mapToDoctor(x))) },
      error: (err: Error) => { }
    });

    this.account.getListWorkers().subscribe({
      next: (res: WorkerDTO[]) => { res.map(x => this.listUsers.push(this.account.mapToWorker(x))) },
      error: error => console.log(error)
    });
  }

  deleteUser(id: string) {
    this.listUsers.map(x => {
      if(x.id == id && x.getSpecialization()){
        this.account.deleteDoctor(id).subscribe({
          next: () => {
            this.listUsers = this.listUsers.filter(x => x.id != id);
            this.account.toastDeleteInfo = true;
            this.account.countToasts.push(1);
          },
          error: error => console.log(error)
        });
      }

      if(x.id == id && !x.getSpecialization()){
        this.account.deleteWorker(id).subscribe({
          next: () => {
            this.listUsers = this.listUsers.filter(x => x.id != id);
            this.account.toastDeleteInfo = true;
            this.account.countToasts.push(1);
          },
          error: error => console.log(error)
        });

        this.account.deleteDoctor(id).subscribe({
          next: () => {
            this.listUsers = this.listUsers.filter(x => x.id != id);
            this.account.toastDeleteInfo = true;
            this.account.countToasts.push(1);
          },
          error: error => console.log(error)
        });
      }
    });
  }
}
