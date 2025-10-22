import { UserDto } from "app/common-service/models/web-site/user.dto";
import { ClassInfoDto } from "./class-info.dto";

export class ClassTimeDto  {

    constructor(
        public id? : number,
        public code?:number,
        public title?: string,
        public description?: string,
        public isActive?:boolean,
        
        public classInfoId?:number,
        public classInfo?:ClassInfoDto,

        public userId?:number,
        public user?:UserDto,
        
        

    ) { 
    }
}
