 export class Day{
    id!: number;
    idDoctor!: string;
    date!: string;
    hoursFrom!: string;
    hoursTo!: string;

    constructor(id: number, idDoctor: string, date: string, hoursFrom: string, hoursTo: string){
        this.id = id;
        this.idDoctor = idDoctor;
        this.date = date;
        this.hoursFrom = hoursFrom;
        this.hoursTo = hoursTo; 
    }
 }