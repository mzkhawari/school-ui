export class CountryProvinceCityDto   {

    constructor(
        public id? : number,
        public title?: string,
        public description?:string,
        public type ?:number,
        public priority?:number,
        public isActive?:boolean,

        public parentId?:number, 
        public parent?:CountryProvinceCityDto,
    ){        
    }
}
