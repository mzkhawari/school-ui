
export interface IDatarecordSearchDto {
    employeeId?: string;
    employee?: any;
    dateFrom?: any;
    dateTo?: any;
    titleReport?:string ;
    activeId?: number;
    
    employeeIds?: any[];
    employees?: any[];
    
    departmentId?: string;
    branchId?: string;

    monthId? : number;
    yearId?:number;


    warehouseId?:string;
    productLevelId?:string;
    productLevelId2?:string;
    productId?:string;

  }