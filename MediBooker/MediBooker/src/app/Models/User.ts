import { Doctor } from "./Doctor";

export abstract class User{
    id!: string;
    name: string | undefined | null;
    surname: string | undefined | null;
    image: string[] | string | undefined | null;
    userImg!: string;
    // specialization: string | undefined | null;
    email!: string;
    file!: File;

    constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[]| string | undefined | null, email:string, userImg: string){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.image = image;
        // this.specialization = specialization;
        this.email = email;
        this.userImg = userImg;
    }

    abstract getSpecialization(): string | undefined | null;
    abstract setSpecialization(spec: string | undefined | null): any;
};

// specialization:string | undefined | null
