export class ReservationDTO {
  id!: number;
  name!: string;
  lastName!: string;
  dateOfBirth!: string;
  email!: string;
  phoneNumber!: number;
  scheduleId!: number;

  constructor(name: string, lastName: string, dateOfBirth: string, email: string, phoneNumber: number, scheduleId: number) {
    this.id = 0;
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.scheduleId = scheduleId;
  }
}
