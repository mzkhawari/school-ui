import { YearDayDto } from './year-day.dto';
export class WorkCalendarDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public IsActive?:boolean,
        public IsWeekHoliday?:boolean,
        public IsYearHoliday?:boolean,



        public YearDayId?:number,
        public YearDay?:YearDayDto,

    ){        
    }
}
