
export class StudentDto  {

    constructor(
        public id? : number,
        public applicantCode?: string,
        public firstName?:boolean,
        public lastName?:boolean,
        public fatherName?:boolean,
        public fullName?:boolean,
        
        public cellPhone?:string,
        public cellPhoneEitaa?:string,
        public brithDate?:string,
        public nationality?:string,
        public nationalCode?:string,
        public address?:string,

        public picAvatar?:string,
        public picAvatarThumb?:string
      
    ) { 
    }
}
