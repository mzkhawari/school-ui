
export class PeriodDayDto  {

    constructor(
        public id? : number,
        public title?: string,
        //public description?: string,
        //public isHoliday?:boolean,
        //public isActive?:boolean,
        public dateOfClass?:any,
        public hourFrom ?:any,
        public hourTo?:any,

        public periodId?:number,
        public period?:any,

    ) { 
    }
}
