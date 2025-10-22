import { WorkLicenseDto } from "./work-license.dto";
import { WorkSiteDto } from "./work-site.dto";

export class LicenseDto  {
    constructor(
        public id? : number,
        public title?: string,
        public licenseTitlePermission?: string,
        public licenseNo?:string,
        public taxNumber?:string,
        public address?:string,
        public email?:string,
        public licenseIssueDate?:any,
        public licenseExpireDate?:any,
        public licenseUrl?:string,        
        public accountId?:number,
        public country?:string,
        public phoneNumber?:string,

        public dangerLevel?:number,
        public dangerLevelTitle?:string,
        public isPEP?:boolean,
        public mountlyIncome?:number,
        public sourceIncome?:string,
        public tin?:string,
        public targetAccount?:string,
        public isCheckPunishment?:boolean,

        public workLicenseId?:number,
        public workLicense?:WorkLicenseDto,

        public workSiteId?:number,
        public workSite?:WorkSiteDto,
        public workSiteTitle?:string,
        public modifyDate?:string,
        public modifyUserId?:number,

        ) { 
    }
}
