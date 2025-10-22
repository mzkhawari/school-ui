export class OptionFieldValueDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public Description?:string,

        public Priority?:number,
        public ClassName?:string,
        public FieldName?:string,
    ){        
    }
}
