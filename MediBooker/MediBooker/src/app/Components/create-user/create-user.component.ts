import { Component } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  role: string = '';
  email: string = '';
  info: string = '';
  completed: boolean = false;

  constructor(private accountService: AccountService) {}

  createUser() {
    if(this.role == 'worker') {
      this.accountService.createWorker(this.email).subscribe({
        next: res =>  {
          this.info = `Użytkownik z rolą (${this.role}) o adresie email (${res.email}) został pomyślnie utworzony! Dane do logowania zostały wysłane na adres email.`;
          this.completed = true;
        },
        error: err => {
          this.info = `Coś poszło nie tak podczas tworzenia użytkownika. Błąd: ${err}`;
          this.completed = true;
        }
      });
    } else {
      this.accountService.createDoctor(this.email).subscribe({
        next: res => {
          this.info = `Użytkownik z rolą (${this.role}) o adresie email (${res.email}) został pomyślnie utworzony! Dane do logowania zostały wysłane na adres email.`;
          this.completed = true;
        },
        error: err => {
          this.info = `Coś poszło nie tak podczas tworzenia użytkownika. Błąd: ${err}`;
          this.completed = true;
        }
      });
    }
  }

}
