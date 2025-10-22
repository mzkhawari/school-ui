import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ngx-currency';
import { customCurrencyMaskConfig } from 'app/app.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CommonDirectiveModule } from 'app/common-module/common-directive/common-directive.module';
import { CommonPipeModule } from 'app/common-module/common-pipe/common-pipe.module';
import { SharedGridModule } from 'app/shared-grid/shared-grid.module';
import { CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';
import { CommonComponentDatePickerMaterialModule } from 'app/common-module/common-component-datepicker-material/common-component-datepicker-material.module';
import { CommonComponentPageHeaderMaterialModule } from 'app/common-module/common-component-page-header-material/common-component-page-header-material.module';
import { CommonComponentSelectMaterialModule } from 'app/common-module/common-component-select-material/common-component-select-material.module';
import { CommonComponentGridDevexpressModule } from 'app/common-module/common-component-grid-dev/common-component-grid-dev.module';
import { AttachmentFileModule } from 'app/attachmen-file-module/attachmen-file.module';
import { CommonComponentImageCropModule } from 'app/common-module/common-component-image-crop/common-component-image-crop.module';
import { StudentPresentComponent } from './student-present/student-present.component';
import { StudentPresentFormComponent } from './student-present/student-present-form/student-present-form.component';
import { StudentComponent } from './student/student.component';
import { studentRoutes } from './student.routing';
import { StudentFormComponent } from './student/student-form/student-form.component';

@NgModule({
    declarations: [
        StudentComponent,
        StudentFormComponent,
        StudentPresentComponent,
        StudentPresentFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(studentRoutes),
        MatButtonModule,
        
        //AngularEditorModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        //MatPaginatorModule,
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
        //CdkAccordionModule,
        
        //CommonComponentDevexpressModule,
        CommonComponentGridDevexpressModule,
        CommonComponentGridMaterialModule,
        CommonComponentSelectMaterialModule,
        CommonComponentDatePickerMaterialModule,
        CommonComponentPageHeaderMaterialModule,
        CommonComponentImageCropModule,
        AttachmentFileModule,
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
export class StudentModule {
}
