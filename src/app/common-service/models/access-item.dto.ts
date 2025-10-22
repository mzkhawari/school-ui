export class AccessItemDto   {

    constructor(
        public id? : number,
        public key?: string,
        public isShow?: boolean,
        public isEdit?: boolean,
        public isAdd?: boolean,
        public isDelete?: boolean,
        public urlRequest?: string,
    
    ){        
    }
}
