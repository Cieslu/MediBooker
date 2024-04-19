export class LoginDTO{
    email!: string;
    password!: string;

    constructor(){
        this.email = "";
        this.password = "";
    };
}