import { WorkTypeDayDto } from "./work-type-day.dto";

export class WeekDayDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public IsHoliday?:boolean,
        public Abbreviation?:string,

        public WorkTypeDayId?:number,
        public WorkTypeDay?:WorkTypeDayDto

    ){        
    }
}
