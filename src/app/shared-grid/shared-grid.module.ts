import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule, DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppGridPagingComponent } from './app-grid/app-grid-paging.component';
import { CommonDirectiveModule } from 'app/common-module/common-directive/common-directive.module';
import { CommonPipeModule } from 'app/common-module/common-pipe/common-pipe.module';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    SharedModule,    
    NgbModule,
    CommonDirectiveModule,
    CommonPipeModule,
    //NgbModule, 
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
    //...MODULES,    
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppGridPagingComponent,
  ],
  exports: [
    AppGridPagingComponent,
  ],
  entryComponents: [

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DecimalPipe}
  ],

})
export class SharedGridModule {
  static forRoot() {
    return {
      NgModule: SharedGridModule,
    }
  }
}
