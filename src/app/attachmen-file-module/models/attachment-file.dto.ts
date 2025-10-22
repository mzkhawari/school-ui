import { AccountDto } from "app/student-module/models/account.dto";
import { CustomerInfoDto } from "app/student-module/models/customer-info.dto";

export class AttachmentFileDto  {
    constructor(
        public id? : number,
        public fileUrl?: string,
        public description?:string,
        public isDeleted?:boolean,

        public transferCashId?:number,
        public transferCash?:any,

        public accountId?:number,
        public account?:AccountDto,

        public customerId?:number,
        public customer?:CustomerInfoDto,
    ) { 
    }
}
