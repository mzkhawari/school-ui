export interface CountryProvinceCityDto   {
    id? : number,
    title?: string,
    description?:string,
    type ?:number,
    priority?:number,
    isActive?:boolean,
    dangerLevel?:number,

    parentId?:number, 
    parent?:CountryProvinceCityDto,
}
