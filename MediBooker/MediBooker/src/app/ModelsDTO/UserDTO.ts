// export class UserDTO{
//     id!: string;
//     name: string | undefined | null;
//     surname: string | undefined | null;
//     image: string[]| string | undefined | null;
//     specialization: string | undefined | null;
//     email!: string;
//     file!: File;

//     constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[]| string | undefined | null, specialization:string | undefined | null, email:string){
//         this.id = id;
//         this.name = name;
//         this.surname = surname;
//         this.image = image;
//         this.specialization = specialization;
//         this.email = email;
//     }
// }
export class UserDTO{
    id!: string;
    name: string | undefined | null;
    surname: string | undefined | null;
    image: string[]| string | undefined | null;
    // specialization: string | undefined | null;
    email!: string;
    file!: File;

    constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[]| string | undefined | null, email:string){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.image = image;
        // this.specialization = specialization;
        this.email = email;
    }
}
// specialization:string | undefined | null