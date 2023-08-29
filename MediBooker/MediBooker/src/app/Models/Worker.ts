import { User } from "./User";

export class Worker extends User{
    // id!: string;
    // name: string | undefined | null;
    // surname: string | undefined | null;
    // image: string[]| string | undefined | null;
    // email!: string;

    constructor(id:string, name:string | undefined | null, surname:string | undefined | null, image:string[] | string | undefined | null, email:string, userImg:string){
        super(id, name, surname, image, email, userImg);

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
