

export class ReportSearchConfigDto {

    constructor(
        
        public isDateFrom?: boolean,
        public isDateTo?: boolean,

        public isCurrencyFrom?: boolean,
        public isCurrencyTo?: boolean,

        public isBranchFrom?: boolean,
        public isBranchTo?: boolean,
        public isProvinceCity?: boolean,

        public isAccountFrom?: boolean,
        public isAccountTo?: boolean,

        public isTransactionNo?: boolean,
        public isTransactionStatus?: boolean,

        public isTransactionType?: boolean,


        public isCheckPunishment?: boolean,
        public isPEP?: boolean,
        public isSourceIncome?: boolean,
        public isTargetAccount?: boolean,
        public isTIN?: boolean,
        public isMountlyIncome?: boolean,
        public isDangerLevel?: boolean,
        public isAmount?: boolean,

        public isAccCodeTypeId?: boolean,
        public isAccountingSubAccount?: boolean,

        public isBranchesConnected?:boolean,
        public isTypeAccount?:boolean,
        public reportCode?:number, 
        public isFinanceYear?:boolean, 

    ) {
    }
}
