export class ReservationDetails {
    id!: number;
    name!: string;
    lastName!: string;
    dateOfBirth!: string;
    email!: string;
    phoneNumber!: string;
    hoursFrom!: string;
    hoursTo!: string;

    constructor(
        id: number,
        name: string,
        lastName: string,
        dateOfBirth: string,
        email: string,
        phoneNumber: string,
        hoursFrom: string,
        hoursTo: string
      ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.hoursFrom = hoursFrom;
        this.hoursTo = hoursTo;
      }
}