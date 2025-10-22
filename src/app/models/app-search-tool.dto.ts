

export class AppSearchToolDto {

    constructor(
        public dateFrom?: any,
        public dateTo?: any,

        public shiftTypeId?: number,
        public userId?: number,
        public branchId?: number,
        public accessToAllShift?: boolean,

    ) {
    }
}
