

export class AccountJobDto  {

    constructor(
        public id? : number,
        public title?: string,
        public description?:string,
        public isActive?:boolean,
        public dangerLevel?:number,
        
    ) { 
    }
}
