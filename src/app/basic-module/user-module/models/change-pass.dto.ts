
export class ChangePassword  {

    constructor(
        public currentPassword?:string,
        public newPassword?:string,
        public newPasswordConfirm?:string,
    ) { 
    }
}
