export class ChangePasswordDTO{
    currentPassword: string | null;
    oldPassword: string | null;

    constructor(currentPassword: string | null, oldPassword: string | null, repeatNewPassword: string | null){
        this.currentPassword = currentPassword;
        this.oldPassword = oldPassword;
    }
}