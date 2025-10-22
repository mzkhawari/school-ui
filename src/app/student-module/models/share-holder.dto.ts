import { CountryProvinceCityDto } from "app/common-service/models/Base/country-province-city.dto";


export class ShareHolderDto  {

    constructor(
        public id? : number,
        public firstName?:boolean,
        public lastName?:boolean,
        public fatherName?:boolean,
        public address?:boolean,
        public mobileNo?:boolean,
        public email?:boolean,
        public gender?:boolean,

        public genderTitle?:string,
        public description?:string,
        public fullName?:string,

        public provinceId?:number,
        public province?:CountryProvinceCityDto,
        public cityId?:number,
        public city?:CountryProvinceCityDto,

        public dateBrith?:any,

        public picUrlAvatar?:string,
        public picUrlOthers?:string,

    ) { 
    }
}
