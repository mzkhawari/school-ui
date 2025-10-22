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
import { BranchComponent } from './branch/branch.component';
import { BranchFormComponent } from './branch/branch-form/branch-form.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ngx-currency';
import { customCurrencyMaskConfig } from 'app/app.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { ChartOrganFormComponent } from './chart-organ/chart-organ-form/chart-organ-form.component';
import { ChartOrganComponent } from './chart-organ/chart-organ.component';
import { ChartOrganDiagramViewComponent } from './chart-organ/chart-organ-diagram-view/chart-organ-diagram-view.component';
import { BranchPartnerFormComponent } from './branch-partner/branch-partner-form/branch-partner-form.component';
import { BranchPartnerComponent } from './branch-partner/branch-partner.component';
import { CommonDirectiveModule } from 'app/common-module/common-directive/common-directive.module';
import { CommonPipeModule } from 'app/common-module/common-pipe/common-pipe.module';
import { BranchUserComponent } from './branch-user/branch-user.component';
import { BranchUserFormComponent } from './branch-user/branch-user-form/branch-user-form.component';
import { SharedGridModule } from 'app/shared-grid/shared-grid.module';
import { branchRoutes } from './branch.routing';
import { CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';
import { CommonComponentDatePickerMaterialModule } from 'app/common-module/common-component-datepicker-material/common-component-datepicker-material.module';
import { CommonComponentSelectMaterialModule } from 'app/common-module/common-component-select-material/common-component-select-material.module';
import { CommonComponentPageHeaderMaterialModule } from 'app/common-module/common-component-page-header-material/common-component-page-header-material.module';

@NgModule({
    declarations: [
        BranchComponent,
        BranchFormComponent,
        BranchUserComponent,
        BranchUserFormComponent,
        BranchPartnerComponent,
        BranchPartnerFormComponent,
        //ChartOrganComponent,
        ChartOrganFormComponent,
        ChartOrganDiagramViewComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularEditorModule,
        RouterModule.forChild(branchRoutes),
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
        CommonComponentDatePickerMaterialModule, CommonComponentGridMaterialModule,
        CommonComponentSelectMaterialModule,
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
export class BranchModule {
}
