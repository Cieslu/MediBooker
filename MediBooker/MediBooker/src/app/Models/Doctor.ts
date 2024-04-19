import { User } from "./User";

export class Doctor extends User{
    // id!: string;
    // name: string | undefined | null;
    // surname: string | undefined | null;
    // image: string[]| string | undefined | null;
    specialization: string | undefined | null;
    // email!: string;
    // file!: File;

    constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[] | string | undefined | null, specialization:string | undefined | null, email:string, userImg:string){
        super(id,name,surname,image,email, userImg);
        this.specialization = specialization;
        // this.id = id;
        // this.name = name;
        // this.surname = surname;
        // this.image = image;
        // this.specialization = specialization;
        // this.email = email;
    }


    override getSpecialization(): string | undefined | null{
        return this.specialization;
    }

    override setSpecialization(spec: string | undefined | null){
        this.specialization = spec;
    }
}
