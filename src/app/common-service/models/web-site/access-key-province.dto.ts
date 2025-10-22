import { CountryProvinceCityDto } from '../Base/country-province-city.dto';
import { UserRoleDto } from './user-role.dto';
import { UserDto } from './user.dto';

export class AccessKeyProvinceDto {
  constructor(
    public id?: number,

    public userRoleId?: number,
    public userRole?: UserRoleDto,

    public userId?: number,
    public user?: UserDto,

    public provinceId?: number,
    public province?: CountryProvinceCityDto,

  ) {
  }
}
