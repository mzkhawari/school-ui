export class AccessKeyDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public Key?: string,
        public IsActive?: boolean,
        public UrlRequest?: string,
        public Description?: string,


        public AccessKeyParentId?:number,
        public AccessKeyParent?:AccessKeyDto,
    
    ){        
    }
}
