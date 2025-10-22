import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TimeMaskDirective } from 'app/common-module/common-directive/directive/time-mask.directive';
import { DateMaskDirective } from 'app/common-module/common-directive/directive/date-mask.directive';
import { TimeFullMaskDirective } from './directive/time-full-mask.directive';
import { DigiSeperatorDirective } from './directive/card-number-directive';
import { CurrencyNumberDirective } from './directive/currency-number-directive';
import { PersianNumberToEnglishDirective } from './directive/persian-number-english';
import { DebounceClickDirective } from './directive/debounce-click-directive';
const MODULES = [
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    DateMaskDirective,
    TimeMaskDirective,
    TimeFullMaskDirective,
    DigiSeperatorDirective,
    CurrencyNumberDirective,
    DebounceClickDirective,
    PersianNumberToEnglishDirective
  ],
  exports: [
    DateMaskDirective,
    TimeMaskDirective,
    TimeFullMaskDirective,
    DigiSeperatorDirective,
    CurrencyNumberDirective,
    DebounceClickDirective,
    PersianNumberToEnglishDirective
  ],
  entryComponents: [

  ],

})
export class CommonDirectiveModule {
  static forRoot() {
    return {
      NgModule: CommonDirectiveModule,
    }
  }
}
