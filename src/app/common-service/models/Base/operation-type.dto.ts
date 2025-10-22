export class OperationTypeDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public Description?:string,
        public Character?:string,
        public ColorSign?:string,

        public Coefficient?:number,
        public LessOfValue?:number,
        public CoefficientLessOfValue?:number,
        public EqualValue?:number,
        public CoefficientEqualValue?:number,


        public OperationTypeParentId?:number,
        public OperationTypeParent?:OperationTypeDto,
        
        public ParentId?:number,
        public items?:OperationTypeDto[],

        public LevelSoftId?:number,       


    ){        
        //ParentId = OperationTypeParentId;
    }
}
