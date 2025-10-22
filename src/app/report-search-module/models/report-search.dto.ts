

export class ReportSearchDto {

    constructor(
        public amount?: number,
        public buySellRate?: number,
        public marketRate?: number,
        public benefitRate?: number,
        public paidable?: number,
        public remark?: string,
        public commession?: number,

        public dateFrom?: any,
        public dateTo?: any,
        public dateFromStr?: string,
        public dateToStr?: string,
        public transactionCode?: string,

        public accCodeTypeId?: number,
        public transferCashStatus?: number,
        public transferCashTypeId?: number,

        public branchId?: number,
        public reciverBranchId?: number,

        public accountFromId?: number,
        public accountToId?: number,

        public currencyFromId?: number,
        public currencyToId?: number,

        public provinceId?: number,
        public cityId?: number,


        public isCheckPunishment?: boolean,
        public isPEP?: boolean,
        public sourceIncome?: string,
        public targetAccount?: string,
        public tIN?: string,
        public mountlyIncomeFrom?: number,
        public mountlyIncomeTo?: number,
        public dangerLevel?: number,

        public subAccountingId?: number,
        public accountingId?: number,

        public isFullPrint: boolean=false,
        public page: number=1,
        public size: number=10

    ) {
    }
}
