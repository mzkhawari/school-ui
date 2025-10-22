import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportCustomerAccountComponent } from './report-customer-account/report-customer-account.component';
import { ReportCustomerAccountCompanyComponent } from './report-customer-account-company/report-customer-account-company.component';
import { CommonComponentGridDevexpressModule } from 'app/common-module/common-component-grid-dev/common-component-grid-dev.module';
import { ReportSearchModule } from 'app/report-search-module/report-search-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { reportAccountRoutes } from './report-account-module.routing';
import { ReportCustomerAccounToptComponent } from './report-customer-account-top/report-customer-account-top.component';

@NgModule({
    declarations: [
        ReportCustomerAccountComponent,
        ReportCustomerAccounToptComponent,        
        ReportCustomerAccountCompanyComponent,

    ],
    imports     : [
        RouterModule.forChild(reportAccountRoutes),
        CommonModule,
        TranslateModule,
        CommonComponentGridDevexpressModule,
        //ReportSearchModule,
    ],    
    providers: [
	],
    schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportAccountModule
{
}
