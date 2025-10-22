import { CountryProvinceCityDto } from "app/common-service/models/Base/country-province-city.dto";
import { UserDto } from "app/common-service/models/web-site/user.dto";


export class BranchDto  {

    constructor(
        public id? : number,
        public title?: string,
        public description?:string,
        public phone?:string,
        public email?: string,
        public isActive?:boolean,
        public address?:string,
        public isPartner?:boolean,
        public branchManager?:string,
        public ceilingAmountTrn?:number,
        public minAmountTreasury?:number,
        public dangerLevel?:number,

        public financeBankId?:number,
        public financeCashId?:number,

        public userId?:number,
        public user?:UserDto,

        public countryId?:number,
        public country?:CountryProvinceCityDto,

        public provinceId?:number,
        public provice?:CountryProvinceCityDto,

        public cityId?:number,
        public city?:CountryProvinceCityDto,
        
    ) { 
    }
}
