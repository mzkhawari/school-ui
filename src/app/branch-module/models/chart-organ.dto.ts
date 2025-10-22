import { UserDto } from "app/common-service/models/web-site/user.dto";

export class ChartOrganDto  {

    constructor(
        public id? : number,
        public fullName?: string,
        public postTitle?: string,
        public description?:string,
        public levelChart?:boolean,
        public picUrlAvatar?:string,

        
        public userId?:number,
        public user?:UserDto,

        public parentId?:number,
        public parent?:ChartOrganDto
        
    ) { 
    }
}
