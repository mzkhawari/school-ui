import { Route } from '@angular/router';
import { BranchPartnerFormComponent } from './branch-partner/branch-partner-form/branch-partner-form.component';
import { BranchPartnerComponent } from './branch-partner/branch-partner.component';
import { BranchUserComponent } from './branch-user/branch-user.component';
import { BranchFormComponent } from './branch/branch-form/branch-form.component';
import { BranchComponent } from './branch/branch.component';
import { ChartOrganComponent } from './chart-organ/chart-organ.component';

export const branchRoutes: Route[] = [    
    {
        path: 'branches',
        component: BranchComponent,
    },
    {
        path: 'branch/:id',
        component: BranchFormComponent,
    },
    {
        path: 'branch/add',
        component: BranchFormComponent,
    },

    {
        path: 'branch-user/:id',
        component: BranchUserComponent,
    },

    {
        path: 'branch-partner',
        component: BranchPartnerComponent,
    },
    {
        path: 'branch-partner/:id',
        component: BranchPartnerFormComponent,
    },
    {
        path: 'branch-partner/add',
        component: BranchPartnerFormComponent,
    },
    {
        path: 'chart-organ',
        component: ChartOrganComponent,
    },
    {
        path: 'chart-sub-organ/:id',
        component: ChartOrganComponent,
    },
];
