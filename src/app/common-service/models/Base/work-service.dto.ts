export class WorkServiceDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public Description?:string,
        public Code?:number,
        public MovingTimeFrom?:number,
        public MovingTimeTo?:number,
    ){        
    }
}
