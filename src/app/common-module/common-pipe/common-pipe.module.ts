import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SortByPipe } from './pipes/sort-by.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { CurrencyNumberPipe } from './pipes/currency-number-pipe';
import { PersianToEnglishNumberPipe } from './pipes/persian-english-numbers-pipe';
const MODULES = [
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],  
  declarations: [
    SortByPipe,
    SearchPipe,
    PersianToEnglishNumberPipe,
    CurrencyNumberPipe,
  ],  
  exports:[
    SortByPipe,
    SearchPipe,
    PersianToEnglishNumberPipe,
    CurrencyNumberPipe,
  ],
  entryComponents: [

  ], 

})
export class CommonPipeModule {
  static forRoot(){
    return{
      NgModule : CommonPipeModule,
    }
  }
 }
