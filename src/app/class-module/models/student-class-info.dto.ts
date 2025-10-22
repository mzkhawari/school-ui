import { UserDto } from "app/common-service/models/web-site/user.dto";
import { ClassInfoDto } from "./class-info.dto";

export class StudentClassInfoDto  {

    constructor(
        public id? : number,
        
        public classInfoId?:number,
        public classInfo?:ClassInfoDto,

        public studentId?:number,
        public student?:UserDto,
        
        

    ) { 
    }
}
