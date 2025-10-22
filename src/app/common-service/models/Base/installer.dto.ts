export class InstallerDto   {

    constructor(
        public Id? : number,
        public Title?: string,
        public SystemCode?:string,
        public IsActive?:boolean,
        public HashCode?:string,
    ){        
    }
}
