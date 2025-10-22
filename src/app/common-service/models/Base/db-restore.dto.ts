export class DBRestoreDto  {

    constructor(
        public Id? : number,
        public Description?: string,
        public AddressFile?:string,
        public RestoreDate?:Date,
        
        public RestoreDateFa?:string,
    ){        
    }
}
