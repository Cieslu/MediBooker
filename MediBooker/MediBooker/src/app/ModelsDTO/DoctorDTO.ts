// export class DoctorDTO {
//     id!: string;
//     name: string | undefined | null;
//     surname: string | undefined | null;
//     image: string[]| string | undefined | null;
//     specialization: string | undefined | null;
//     email!: string;
//     file!: File;


//     constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[]| string | undefined | null, specialization:string | undefined | null, email:string){
//             this.id = id;
//             this.name = name;
//             this.surname = surname;
//             this.image = image;
//             this.specialization = specialization;
//             this.email = email;
//         }
//     }

import { User } from "../Models/User";


export class DoctorDTO extends User{
    // id!: string;
    // name: string | undefined | null;
    // surname: string | undefined | null;
    // image: string[]| string | undefined | null;
    specialization: string | undefined | null;
    override file: File;
    // email!: string;
    // file!: File;

    constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[]| string | undefined | null, specialization:string | undefined | null, email:string, file: File, userImg:string){
        super(id,name,surname,image,email, '');
        this.specialization = specialization;
        this.file = file;
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
