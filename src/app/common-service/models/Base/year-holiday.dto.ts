import { YearDayDto } from './year-day.dto';
export class YearHolidayDto   {

    constructor(
        public Id? : number,
        public Title?: number,
        public Description?: number,
        public CurrentDate?:Date,
        //public IsShamsi?:boolean,

        public YearDayId?:number,
        public YearDay?:YearDayDto,
    ){        
    }
}
