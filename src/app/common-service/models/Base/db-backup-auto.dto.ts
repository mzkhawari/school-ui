import { WeekDayDto } from "./week-day.dto";

export class DBBackupAutoDto  {

    constructor(
        public Id? : number,
        public AddressFileDefualt?: string,
        public IsActive?: boolean,
        public IsFullBackup?: boolean,
        public BackUpForHour?: number,
        public BackupCount?: number,
        public DateFrom?: Date,
        public DateTo?: Date,
        public ExactHour?: number,
        public FromHour?: number,
        public ToHour?: number,
        public IsBackupWhenClose?: number,

        public WeekDayId?:number,
        public WeekDay?:WeekDayDto,

        public DateFromFa?: string,
        public DateToFa?: string,

    ){        
    }
}
