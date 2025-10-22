
export class StudentDto  {

    constructor(
        public id? : number,
        public applicantCode?: string,
        public firstName?:string,
        public lastName?:string,
        public fatherName?:string,
        public fullName?:string,
        
        public cellPhone?:string,
        public cellPhoneEitaa?:string,
        public brithDate?:string,
        public nationality?:string,
        public nationalCode?:string,
        public address?:string,

        public userId?:number,
        public user?:any,
      
    ) { 
    }
}
