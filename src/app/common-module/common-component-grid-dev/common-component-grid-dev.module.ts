import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridModule,
} from 'devextreme-angular';
import { DevGridPrintComponent } from './dev-grid-print/dev-grid-print.component';
import { GridFooterPrintComponent } from './dev-grid-print/grid-footer-print/grid-footer-print.component';
import { GridHeaderPrintComponent } from './dev-grid-print/grid-header-print/grid-header-print.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonDirectiveModule } from '../common-directive/common-directive.module';
import { CommonPipeModule } from '../common-pipe/common-pipe.module';
import { GridHeaderPersonPrintComponent } from './dev-grid-print/grid-header-person-print/grid-header-person-print.component';

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,

    TranslateModule,
    CommonDirectiveModule,
    CommonPipeModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],  
  declarations: [
    DevGridPrintComponent,
    GridFooterPrintComponent,
    GridHeaderPrintComponent,
    GridHeaderPersonPrintComponent,
  ],  
  exports:[
    DevGridPrintComponent,
    GridFooterPrintComponent,
    GridHeaderPrintComponent,
    GridHeaderPersonPrintComponent,
  ],
  entryComponents: [

  ]
})
export class CommonComponentGridDevexpressModule {
  static forRoot(){
    return{
      NgModule : CommonComponentGridDevexpressModule,
    }
  }
 }
