import { Injectable } from '@angular/core';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { of } from 'rxjs';

class Dictionary<T> {
  private items: { [key: string]: T } = {};

  set(key: string, value: T): void {
    this.items[key] = value;
  }

  get(key: string): T | undefined {
    return this.items[key];
  }

  remove(key: string): void {
    delete this.items[key];
  }

  keys(): string[] {
    return Object.keys(this.items);
  }

  values(): T[] {
    return Object.values(this.items);
  }
}


@Injectable({
  providedIn: 'root'
})
export class CashApiService {

  constructor(private baseCrudService: BaseCrudService) {

  }

  myDictionary = new Dictionary<any>();
  // myDictionary.set("apple", 10);
  // myDictionary.set("banana", 20);
  
  // console.log(myDictionary.get("apple")); // 10
  // console.log(myDictionary.keys()); // ['apple', 'banana']
  
  // getInclude<T>(urlApi: string) {
  //   if(this.data[urlApi]!=undefined){
  //     return (this.data[urlApi] as T);
  //   }else{
  //     this.baseCrudService.getInclude(urlApi).subscribe(res=>{
  //       let data =  res as CurrencyDto[];
  //       this.data[urlApi] = data;
  //       return of(this.data);
  //     });
  //   }
  // }  

  getDataUrl<T>(urlApi: string) {
    debugger;
    let value = this.myDictionary.get(urlApi);
    if(value != undefined ){
      return of(value as T);
    }else{
      return this.baseCrudService.getDataUrl(urlApi, "" );
      // .subscribe(res=>{
      //   let data =  res as T;
      //   this.myDictionary.set(urlApi, data);
      //   return of(data);
      // });
    }
  }  
 
}


