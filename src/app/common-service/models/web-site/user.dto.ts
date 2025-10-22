import { TokenDto } from './token.dto';
import { UserRoleDto } from './user-role.dto';
import { BaseModelDto } from '../base-model.dto';
import { AccessItemDto } from '../access-item.dto';
import { BranchDto } from 'app/branch-module/models/branch.dto';
export class UserDto extends BaseModelDto {

    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public isActive?: boolean,
        public description?: string,

        public email?: string,
        public userName?: string,
        public password?: string,
        public cellPhone?: string,
        public brithDay?: Date,
        public nationalCode?: string,
        public picUrlAvatar?: string,
        public rememberMe?: boolean,
        public confirmPassword?: boolean,
        public fullName?: string,

        public token?: TokenDto,
        public accessKey?: AccessItemDto[],

        public branchInfo?: BranchDto,

        public userRoleId?: number,
        public userRole?: UserRoleDto,

        public branchId?: number,
        public branch?: BranchDto,

        public accCodeId?: number,


        public status?: string,


    ) {
        super();
    }



}
