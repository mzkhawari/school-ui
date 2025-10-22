

export class ReportSearchAccountDto  {

    constructor(
        public accountStatus?: number,
        public accountNo?:number,
        public cityId?:number,
        public provinceId?:number,
        public identityTypeId?:number,
        public genderId?:string,
        public accountTypeId?:number,
        public branchId?:number,
        public dateFrom?:any,
        public dateTo?:any,

        public dangerLevel?:number,
        public isPEP?:boolean,
        public isCheckPunishment?:boolean,
        public incomeFrom?:number,
        public incomeTo?:number,

        public isTempAccount?:boolean,
        public isAllwaysAccount?:boolean,

        
    ) { 
    }
}
