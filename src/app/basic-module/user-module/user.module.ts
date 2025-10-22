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
import { userRoutes } from './user.routing';
import { UserFormComponent } from './user-info/user-form/user-form.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleFormComponent } from './user-role/user-role-form/user-role-form.component';
import { AccessKeyRoleUserComponent } from './accesskey-role-user/accesskey-role-user.component';
import { AccessKeyRoleUserFormComponent } from './accesskey-role-user/accesskey-role-user-form/accesskey-role-user-form.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ResetPasswordComponent } from './reset-pasword/reset-password.component';
import { UserLogReportComponent } from './reporting/user-log-report/user-log-report.component';
import { UserReportComponent } from './reporting/user-report/user-report.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogRef } from '@angular/material/dialog';
import { UrlRedirectComponent } from './url-redirect/url-redirect.component';
import { ResetPasswordAdminComponent } from './reset-pasword-admin/reset-pasword-admin.component';
import { AccessKeyInlineFormComponent } from './accesskey-role-user/accesskey-role-inline-form/accesskey-inline/accesskey-inline-form.component';
import { AccessKeyProvinceFormComponent } from './accesskey-province/accesskey-province-form/accesskey-province-form.component';
import { AccessKeyProvinceComponent } from './accesskey-province/accesskey-province.component';
import { AccessKeyRoleInlineFormComponent } from './accesskey-role-user/accesskey-role-inline-form/accesskey-role-inline-form.component';
import { AccessKeyBranchComponent } from './accesskey-branch/accesskey-branch.component';
import { AccessKeyBranchFormComponent } from './accesskey-branch/accesskey-branch-form/accesskey-branch-form.component';
import { CommonComponentGridMaterialModule } from 'app/common-module/common-component-grid-material/common-component-grid-material.module';
import { CommonComponentSelectMaterialModule } from 'app/common-module/common-component-select-material/common-component-select-material.module';
import { CommonComponentDatePickerMaterialModule } from 'app/common-module/common-component-datepicker-material/common-component-datepicker-material.module';
import { CommonComponentPageHeaderMaterialModule } from 'app/common-module/common-component-page-header-material/common-component-page-header-material.module';
import { UserTypeListComponent } from './user-info/user-type-form/user-type-list.component';
import { UserTypeFormComponent } from './user-info/user-type-form/user-type-form/user-type-form.component';

@NgModule({
    declarations: [
        UserInfoComponent,
        UserFormComponent,
        UserRoleComponent,
        UserRoleFormComponent,
        AccessKeyRoleUserComponent,
        AccessKeyRoleUserFormComponent,
        AccessKeyProvinceComponent,
        AccessKeyProvinceFormComponent,
        AccessKeyBranchComponent,
        AccessKeyBranchFormComponent,
        AccessKeyRoleInlineFormComponent,
        AccessKeyInlineFormComponent,
        ResetPasswordComponent,
        UserLogReportComponent,
        UserReportComponent,
        UrlRedirectComponent,
        ResetPasswordAdminComponent,
        UserTypeListComponent,
        UserTypeFormComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes),
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
        CommonComponentDatePickerMaterialModule,
        CommonComponentPageHeaderMaterialModule,
        SharedModule
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    providers: [{
        provide: MatDialogRef, useValue: {}
    }]

})
export class UserModule {
}
