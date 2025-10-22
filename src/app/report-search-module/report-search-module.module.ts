import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ngx-currency';
import { customCurrencyMaskConfig } from 'app/app.module';
import { CommonComponentSelectMaterialModule } from 'app/common-module/common-component-select-material/common-component-select-material.module';
import { CommonComponentDatePickerMaterialModule } from 'app/common-module/common-component-datepicker-material/common-component-datepicker-material.module';
import { ReportSearchComponent } from './report-search/report-search.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonComponentPageHeaderMaterialModule } from 'app/common-module/common-component-page-header-material/common-component-page-header-material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReportSearchAccountComponent } from './report-search-account/report-search-account.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [
        ReportSearchComponent,
        ReportSearchAccountComponent
    ],    
    imports     : [
        CommonModule,
        FormsModule,
        MatSelectModule,      
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatInputModule,
        NgxMatSelectSearchModule,
        MatAutocompleteModule,
        CommonComponentSelectMaterialModule,
        CommonComponentDatePickerMaterialModule,
        CommonComponentPageHeaderMaterialModule,
        CurrencyMaskModule,
        SharedModule
    ],    
    exports:[
        ReportSearchComponent,
        ReportSearchAccountComponent,
    ],
    providers: [
        {
            provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig
        },
	],
    schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportSearchModule
{
}
