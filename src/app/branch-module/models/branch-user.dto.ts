import { UserDto } from "app/common-service/models/web-site/user.dto";
import { BranchDto } from "./branch.dto";


export class BranchUserDto  {

    constructor(
        public id? : number,
        public isActive?:boolean,

        public userId?:number,
        public user?:UserDto,

        public branchId?:number,
        public branch?:BranchDto,

        
    ) { 
    }
}
