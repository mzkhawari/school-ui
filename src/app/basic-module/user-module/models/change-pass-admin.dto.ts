
export class ChangePasswordAdmin  {

    constructor(
        public currentUserId?:number,
        public newPassword?:string,
        public newPasswordConfirm?:string,
    ) { 
    }
}
