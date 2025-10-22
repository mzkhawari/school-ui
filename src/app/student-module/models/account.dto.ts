import { CountryProvinceCityDto } from "app/common-service/models/Base/country-province-city.dto";
import { LicenseDto } from "./license.dto";
import { AccountJobDto } from "./account-job.dto";
import { BranchDto } from "app/branch-module/models/branch.dto";
import { CustomerInfoDto } from "./customer-info.dto";

export class AccountDto  {

    constructor(
        public id? : number,
        public applicantCode?: string,
        public firstName?:boolean,
        public lastName?:boolean,
        public fatherName?:boolean,
        public fullName?:boolean,
        
        public cellPhone?:string,
        public cellPhoneEitaa?:string,
        public brithDate?:string,
        public nationality?:string,
        public nationalCode?:string,
        public addresss?:string,
        



        public accountNo?: string,
        public accountTitle?: string,
        public customerNo?:string,
        
        public mobileNo?:boolean,
        public email?:boolean,
        public gender?:boolean,
        public genderTitle?:string,
        public identityTypeId?:number,
        public identityTypeTitle?:string,
        public identityNo?:string,
        public position?:string,

        public dateIssuePassport?:any,
        public dateExpirePassport?:any,
        public accountStatus?:number,
        public accountStatusTitle?:string,
        public description?:string,
        public isPartner?:boolean,
        public branchTitle?:string,
        public branchCellPhone?:string,
        public branchEmail?:string,
        public createDateFa?:string,


        public accountJobId?:number,
        public accountJob?:AccountJobDto,

        public address?:string,
        public countryId?:number,
        public country?:CountryProvinceCityDto,
        public provinceId?:number,
        public province?:CountryProvinceCityDto,
        public cityId?:number,
        public city?:CountryProvinceCityDto,

        public address1?:string,
        public provinceId1?:number,
        public province1?:CountryProvinceCityDto,
        public cityId1?:number,
        public city1?:CountryProvinceCityDto,

        public job?:string,
        public dateBrith?:any,
        public branchConfitmId?:number,
        public branchConfitm?:BranchDto,

        public branchId?:number,
        public branch?:BranchDto,

        public accountTypeId?:number,
        public accountTypeTitle?:string,

        public picUrlAvatar?:string,
        public picUrlPassport?:string,
        public picUrlIdentity?:string,
        public picUrlOthers?:string,

        public distributionChannelId?:number,
        public transferCashTypeId?:number,

        
        public dangerLevel?:number,
        public dangerLevelTitle?:string,
        public isPEP?:boolean,
        public mountlyIncome?:number,
        public sourceIncome?:string,
        public tin?:string,
        public targetAccount?:string,
        public isCheckPunishment?:boolean,

        public isUnemployeement?:boolean,



        public licenseId?:number,
        public license?:LicenseDto,


        public bossId?:number,
        public boss?:CustomerInfoDto,

        public customerId?:number,
       // public Customer?:CustomerInfoDto,

        public deputyId?:number,
        public deputy?:CustomerInfoDto,

        public supperterId?:number,
        public supperter?:CustomerInfoDto,


        public accountNoKey?: string,
      
    ) { 
    }
}
