
export class StudentPresentDto  {

    constructor(
        public id? : number,
        public dateIn?: any,
        public dateOut?: any,
        public byMother?:boolean,
        public byFather?:boolean,
        public byOther?:boolean,
        
        public applicantId?:number,
        public applicant?:any,
    ) { 
    }
}
