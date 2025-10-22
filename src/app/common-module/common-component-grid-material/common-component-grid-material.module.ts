import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppGridComponent } from './app-grid/app-grid.component';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { GridHeaderComponent } from './app-grid/grid-header/grid-header.component';
import { CommonComponentDevexpressModule } from '../common-component-dev/common-component-dev.module';
import { DxButtonModule, DxChartModule, DxDataGridModule, DxDropDownBoxModule, DxFunnelModule, DxListModule, DxPieChartModule, DxTreeListModule } from 'devextreme-angular';

import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AppGridImageComponent } from './app-grid-image/app-grid-image.component';
import { SharedModule } from 'app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppGridGroupComponent } from './app-grid-group/app-grid-group.component';
import { AppGridSimpleComponent } from './app-grid-simple/app-grid-simple.component';
import { AppGridSimplePrintComponent } from './app-grid-simple-print/app-grid-simple-print.component';
const MODULES = [
];

@NgModule({
  imports: [
    DxDropDownBoxModule,
    DxDataGridModule,
    DxListModule,
    DxTreeListModule,
    DxChartModule,
    DxPieChartModule,
    DxButtonModule,
    DxFunnelModule,
    MatButtonModule,

    //MatFormFieldModule,
    //MatIconModule,
    //MatInputModule,
    //MatProgressBarModule,
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
    AppGridComponent,
    GridHeaderComponent,
    AppGridImageComponent,
    AppGridGroupComponent,
    AppGridSimpleComponent,

    AppGridSimplePrintComponent,
  ],
  exports: [
    AppGridComponent,
    GridHeaderComponent,
    AppGridImageComponent,
    AppGridGroupComponent,
    AppGridSimpleComponent,

    AppGridSimplePrintComponent,
  ],
  entryComponents: [

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class CommonComponentGridMaterialModule {
  static forRoot() {
    return {
      NgModule: CommonComponentGridMaterialModule,
    }
  }
}
