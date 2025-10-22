
export class PeriodDto  {

    constructor(
        public id? : number,
        public title?: string,
        public description?: string,
        public isActive?:boolean,
        public isSatarday?:boolean,
        public isSunday?:boolean,
        public isMonday?:boolean,
        public isTueday?:boolean,
        public isWedsday?:boolean,
        public isThursday?:boolean,
        public isFirday?:boolean,

    ) { 
    }
}
