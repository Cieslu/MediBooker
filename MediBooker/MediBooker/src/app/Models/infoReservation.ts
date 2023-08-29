import { environment } from "../environment";
import { Day } from "./Day";

export class infoReservation{
    id!: string;
    data!: string;
    dayList!: Day[];
    doctor!: string;
    sprecialization!: string;
    userImg!: string;

    constructor(id: string, data: string, dayList: Day[], name:string, surname:string, specialization: string, userImg: string){
        this.id = id;
        this.data = data;
        this.dayList = dayList;
        this.doctor = name +' '+ surname;
        this.sprecialization = specialization;
        this.userImg = environment.serverAddress + userImg;
    }
}