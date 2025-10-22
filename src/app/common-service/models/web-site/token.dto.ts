export class TokenDto  {

    constructor(
        public accessToken? : string,
        public tokenType?: string,
        public expireIn?: number,
        public refreshToken?: string,
        public userName?: string,
        public issuedDate?: Date,
        public expireDate?: Date,
    
    ){        
    }
}
