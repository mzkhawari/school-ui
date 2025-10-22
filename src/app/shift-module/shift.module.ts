import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonComponentDevexpressModule } from 'app/common-module/common-component-dev/common-component-dev.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatRadioModule } from '@angular/material/radio';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatDialogRef } from '@angular/material/dialog';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ngx-currency';
import { customCurrencyMaskConfig } from 'app/app.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ShiftInfoComponent } from './shift-info/shift-info.component';
import { ShiftInfoFormComponent } from './shift-info/shift-info-form/shift-info-form.component';
import { ShiftInfoViewFormComponent } from './shift-info/shift-view-form/shift-view-form.component';
import { ShiftInfoViewReportFormComponent } from './shift-info/shift-view-report-form/shift-view-report-form.component';
import { CommonDirectiveModule } from 'app/common-module/common-directive/common-directive.module';
import { CommonPipeModule } from 'app/common-module/common-pipe/common-pipe.module';
import { ShiftBalanceViewReportComponent } from './shift-info/shift-balance-view-report/shift-balance-view-report.component';
import { ShiftBalanceViewPrintComponent } from './shift-info/shift-balance-view-print/shift-balance-view-print.component';
import { PrintDialogComponent } from './shift-info/print-dialog/print-dialog.component';
import { SharedGridModule } from 'app/shared-grid/shared-grid.module';
import { ShiftStartEndComponent } from './shift-info/shift-start-end/shift-start-end.component';
import { AppReportSearchComponent } from './shift-info/app-search-tool/app-search-tool.component';
import { shiftRoutes } from './shift.routing';
import { CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';
import { CommonComponentSelectMaterialModule } from 'app/common-module/common-component-select-material/common-component-select-material.module';
import { CommonComponentDatePickerMaterialModule } from 'app/common-module/common-component-datepicker-material/common-component-datepicker-material.module';
import { CommonComponentPageHeaderMaterialModule } from 'app/common-module/common-component-page-header-material/common-component-page-header-material.module';

@NgModule({
    declarations: [
        ShiftInfoComponent,
        ShiftInfoFormComponent,
        ShiftInfoViewFormComponent,
        ShiftInfoViewReportFormComponent,
        ShiftBalanceViewReportComponent,
        ShiftBalanceViewPrintComponent,
        ShiftStartEndComponent,
        PrintDialogComponent,
        AppReportSearchComponent,
        
       
    ],
    exports:[
        ShiftInfoViewFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularEditorModule,
        RouterModule.forChild(shiftRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatCardModule,
        MatTabsModule,
        MatTableModule,
        MatRadioModule,
        CdkAccordionModule,
        CommonComponentDevexpressModule,
        CommonComponentSelectMaterialModule, 
        CommonComponentGridMaterialModule,
        CommonComponentDatePickerMaterialModule,
        CommonComponentPageHeaderMaterialModule,
        CurrencyMaskModule,
        CommonDirectiveModule,
        CommonPipeModule,
        SharedModule,
        SharedGridModule
    ],
    providers: [{
        provide: MatDialogRef, useValue: {},
    },
    {
        provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig
    }
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ShiftModule {
}
