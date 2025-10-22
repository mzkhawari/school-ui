import { PeriodTypeDto } from './period-type.dto'
import { WeekDayDto } from './week-day.dto';
import { YearMonthDto } from './year-month.dto';
export class YearDayDto   {

    constructor(
        public Id? : number,
        public Title?: number,
        public CurrentDate?:Date,
        public IsActive?:boolean,

        public WeekDayId?:number,
        public WeekDay?:WeekDayDto,

        public YearMonthId?:number,
        public YearMonth?:YearMonthDto,

        public YearDayParentId?:number,
        public YearDayParent?:YearDayDto

    ){        
    }
}
