import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
//import { SharedModule } from 'app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { PageHeaderComponent } from './app-page-header/app-page-header.component';
import { CommonComponentDevexpressModule } from '../common-component-dev/common-component-dev.module';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxDropDownBoxModule, DxFunnelModule, DxListModule, DxPieChartModule, DxTreeListModule } from 'devextreme-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key/find-by-key.module';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from '../commom-helper/date-adapter/persian-date-adapter';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
const MODULES = [
];

@NgModule({
  imports: [

    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    //MatSelectModule,
    //MatSidenavModule,
    //MatSlideToggleModule,
    //MatTooltipModule,
    //FuseFindByKeyPipeModule,
    SharedModule,
    //MatTabsModule,
    //MatTableModule,
    //MatPaginatorModule,
    //MatProgressBarModule,
    //MatDatepickerModule,
    //MatNativeDateModule,
    //MatMomentDateModule,
    //MatSortModule,
    //MatProgressSpinnerModule,
    //MatTreeModule,
    MatDialogModule,
    //MatButtonToggleModule,
    //MatCheckboxModule,
    //NgxMatSelectSearchModule,    

    CommonModule,
    FormsModule,
    TranslateModule,
    CommonComponentDevexpressModule,
    //...MODULES,   
    
    
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    PageHeaderComponent,
  ],
  exports: [
    PageHeaderComponent,
  ],
  entryComponents: [

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class CommonComponentPageHeaderMaterialModule {
  static forRoot() {
    return {
      NgModule: CommonComponentPageHeaderMaterialModule,
    }
  }
}
