import { Route } from '@angular/router';
import { ReportCustomerAccountCompanyComponent } from './report-customer-account-company/report-customer-account-company.component';
import { ReportCustomerAccountComponent } from './report-customer-account/report-customer-account.component';
import { ReportCustomerAccounToptComponent } from './report-customer-account-top/report-customer-account-top.component';
import { ReportPresenceAbsenceComponent } from './presence-absence/report-presence-absence/report-presence-absence.component';
import { PresenceAbsenceComponent } from './presence-absence/presence-absence.component';

export const reportAccountRoutes: Route[] = [
    {
        path      : 'report-customer-account',
        pathMatch : 'full',        
        component: ReportCustomerAccountComponent,                                         
    },
    {
        path      : 'report-customer-account-top',
        pathMatch : 'full',        
        component: ReportCustomerAccounToptComponent,                                         
    },
    {
        path      : 'report-customer-account-company',
        pathMatch : 'full',        
        component: ReportCustomerAccountCompanyComponent,                                         
    },    
    // {
    //     path      : 'report-presence-absence',
    //     pathMatch : 'full',        
    //     component: ReportPresenceAbsenceComponent,                                         
    // },    
    {
        path      : 'presence-absence',
        pathMatch : 'full',        
        component: PresenceAbsenceComponent,                                         
    },    
];
