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
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonComponentDevexpressModule } from 'app/common-module/common-component-dev/common-component-dev.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogRef } from '@angular/material/dialog';
import { LogRecordInfoComponent } from './log-record-info/log-record-info.component';
import { logRecordRoutes } from './log-record.routing';
import { CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';
import { CommonComponentSelectMaterialModule } from 'app/common-module/common-component-select-material/common-component-select-material.module';
import { CommonComponentPageHeaderMaterialModule } from 'app/common-module/common-component-page-header-material/common-component-page-header-material.module';
import { CommonComponentDatePickerMaterialModule } from 'app/common-module/common-component-datepicker-material/common-component-datepicker-material.module';
import { SharedGridModule } from 'app/shared-grid/shared-grid.module';

@NgModule({
    declarations: [
        LogRecordInfoComponent,
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(logRecordRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,      
        MatAutocompleteModule,  
        MatSlideToggleModule,
        MatTooltipModule,
        MatCardModule,
        MatTabsModule,    
        MatTableModule,
        MatRadioModule,
        CdkAccordionModule,
        CommonComponentDevexpressModule,
        CommonComponentSelectMaterialModule, CommonComponentGridMaterialModule,
        CommonComponentPageHeaderMaterialModule,
        CommonComponentDatePickerMaterialModule,
        SharedModule,
        SharedGridModule
    ],
    schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
    providers: [{
        provide: MatDialogRef ,  useValue: {}
    }]

})
export class LogRecordModule
{
}
