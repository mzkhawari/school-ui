import { BranchDto } from "app/branch-module/models/branch.dto";
import { UserDto } from "app/common-service/models/web-site/user.dto";

export class ShiftInfoDto  {

    constructor(
        public id? : number,
        public description?: string,
        public openShift?: any,
        public closeShift?:any,
        
        public userId?:number,
        public user?:UserDto,

        public branchId?:number,
        public branch?:BranchDto
        
    ) { 
    }
}
