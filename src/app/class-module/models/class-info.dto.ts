import { UserDto } from "app/common-service/models/web-site/user.dto";
import { PeriodDto } from "./priod.dto";

export class ClassInfoDto  {

    constructor(
        public id? : number,
        public code?:number,
        public title?: string,
        public description?: string,
        public isActive?:boolean,
        
        public periodId?:number,
        public period?:PeriodDto,

        public userId?:number,
        public user?:UserDto,
        
        

    ) { 
    }
}
