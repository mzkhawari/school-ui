import { BranchDto } from 'app/branch-module/models/branch.dto';
import { UserRoleDto } from './user-role.dto';
import { UserDto } from './user.dto';

export class AccessKeyBranchDto {
  constructor(
    public id?: number,

    public userRoleId?: number,
    public userRole?: UserRoleDto,

    public userId?: number,
    public user?: UserDto,

    public branchId?: number,
    public branch?: BranchDto,

  ) {
  }
}
