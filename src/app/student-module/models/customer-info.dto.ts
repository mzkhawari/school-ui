import { BranchDto } from "app/branch-module/models/branch.dto";
import { CountryProvinceCityDto } from "app/common-service/models/Base/country-province-city.dto";


export class CustomerInfoDto  {

    constructor(
        public id? : number,
        public customerNo?:string,
        public customerStatus?:number,
        public firstName?:string,
        public lastName?:string,
        public fatherName?:string,
        public address?:string,
        public mobileNo?:string,
        public email?:string,
        public gender?:number,
        public genderTitle?:string,
        public identityTypeId?:number,
        public identityTypeTitle?:string,
        public identityNo?:string,
        public dateIssuePassport?:any,
        public dateExpirePassport?:any,
        public description?:string,
        public fullName?:string,
        
        public Job?:string,
        public dateBrith?:any,        

        public provinceId?:number,
        public province?:CountryProvinceCityDto,
        public cityId?:number,
        public city?:CountryProvinceCityDto,

        public branchId?:number,
        public branch?:BranchDto,

        public picUrlAvatar?:string,
        public picUrlPassport?:string,
        public picUrlIdentity?:string,
        public picUrlOthers?:string,


        public dangerLevel?:number,
        public dangerLevelTitle?:string,
        public isPEP?:boolean,
        public mountlyIncome?:number,
        public sourceIncome?:string,
        public tin?:string,
        public targetAccount?:string,
        public isCheckPunishment?:boolean,

        public accountId?:number,
        public customerTypeId?:number      
    ) { 
    }
}
