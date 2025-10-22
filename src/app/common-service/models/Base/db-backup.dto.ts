export class DBBackupDto  {

    constructor(
        public Id? : number,
        public Description?: string,
        public AddressFile?: string,

        public IsActive?: boolean,
        public CreateDateFa?: string,

    ){        
    }
}
