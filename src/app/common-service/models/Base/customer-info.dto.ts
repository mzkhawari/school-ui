
export class CustomerInfoDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public CreateDate?:string,
        public PackNumber?:string,
        public ExpireDate?:string,
        public DeviceCount?:number,
        public PersonelCount?:number,
        public UserCount?:number,
        public DeviceSerials?:string[],
        public ShiftCount?:number,
        public SoftwareLevel?:number,
        public Version?:number,
        public YearActive?:number,


        public LeaveSaving?:boolean,
        public Salary?:boolean,
        public SmsService?:boolean,
        public ExcelExport?:boolean,


    ){        
    }
}
