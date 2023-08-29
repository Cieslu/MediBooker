export class CalendarDay{
    idDoctor!: string;
    title!: string;
    start!: string;

    constructor(idDoctor: string, name: string, surname: string, start:string){
        this.idDoctor = idDoctor;
        this.title = name +' '+ surname;
        this.start = start;
    }
}