export class ActivationSoftDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public SystemCode?:string,
        public ActivationCode?:string,
        public ExpirationDate?:string,
    ){        
    }
}
