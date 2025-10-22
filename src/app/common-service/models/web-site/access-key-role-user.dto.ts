import { AccessKeyDto } from './access-key.dto';
import { UserRoleDto } from './user-role.dto';
import { UserDto } from './user.dto';

export class AccessKeyRoleUserDto 
  {
    constructor(
        public id? : number,
        
        public userRoleId?:number,
        public userRole?: UserRoleDto,
        
        public userId?:number,    
        public user?: UserDto,
        
        public accessKeyId?:number,
        public accessKey?: AccessKeyDto,

        public isShow?:boolean,
        public isAdd?:boolean,
        public isEdit?:boolean,
        public isDelete?:boolean,
    ){        
    }
}
