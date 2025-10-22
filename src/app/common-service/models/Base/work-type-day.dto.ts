export class WorkTypeDayDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public Description?: string,
        public IsHoliday?:boolean,

        public Coefficient?:number,
        public LessOfValue?:number,
        public CoefficientLessOfValue?:number,
        public EqualValue?:number,
        public CoefficientEqualValue?:number,

    ){        
    }
}
