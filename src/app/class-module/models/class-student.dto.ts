import { ClassInfoDto } from "./class-info.dto";
import { StudentDto } from "./student.dto";

export class ClassStudentDto  {

    constructor(
        public id? : number,
        
        public classInfoId?:number,
        public classInfo?:ClassInfoDto,

        public studentId?:number,
        public student?:StudentDto,
        
        

    ) { 
    }
}
