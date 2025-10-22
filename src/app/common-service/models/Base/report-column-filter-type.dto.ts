export class ReportColumnFilterDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public TitleEn?: string,
        public IsActive?:boolean,
        public Proriety?:number,
        public IsFix?:boolean,
        
        public ReportColumnFilterParentId?:number,
        public ReportColumnFilterParent?:ReportColumnFilterDto,
        

    ){        
        //ParentId = OperationTypeParentId;
    }
}
