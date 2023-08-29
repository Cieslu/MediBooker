// export class WorkerDTO{
//     id!: string;
//     name: string | undefined | null;
//     surname: string | undefined | null;
//     image: string[]| string | undefined | null;
//     email!: string;



//     constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[] | string | undefined | null, email:string){
//         this.id = id;
//         this.name = name;
//         this.surname = surname;
//         this.image = image;
//         this.email = email;
//     }
// }



import { User } from "../Models/User";

export class WorkerDTO extends User{
    // id!: string;
    // name: string | undefined | null;
    // surname: string | undefined | null;
    // image: string[]| string | undefined | null;
    // email!: string;
    override file: File;

    constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[] | string | undefined | null, email:string, file: File, userImg:string){
        super(id, name, surname, image, email, userImg);
        this.file = file;

        // this.id = id;
        // this.name = name;
        // this.surname = surname;
        // this.image = image;
        // this.email = email;
    }

    override getSpecialization(): string | null | undefined {
        return null;
    }
    override setSpecialization(spec: string | null | undefined): any{}
}
