import { Route } from '@angular/router';
import { ShiftStartEndComponent } from './shift-info/shift-start-end/shift-start-end.component';
import { ShiftInfoComponent } from './shift-info/shift-info.component';
import { ShiftBalanceViewPrintComponent } from './shift-info/shift-balance-view-print/shift-balance-view-print.component';
import { ShiftInfoFormComponent } from './shift-info/shift-info-form/shift-info-form.component';
import { ShiftInfoViewFormComponent } from './shift-info/shift-view-form/shift-view-form.component';

export const shiftRoutes: Route[] = [
    {
        path: 'treasury-view-shift',
        component: ShiftStartEndComponent,
    },
    {
        path: 'shift-info',
        component: ShiftInfoComponent,
    },
    {
        path: 'shift-info-print/:id',
        component: ShiftBalanceViewPrintComponent,
    },
    {
        path: 'shiftinfo-list',
        component: ShiftInfoComponent,
    },
    {
        path: 'shift-info/:id',
        component: ShiftInfoFormComponent,
    },
    {
        path: 'shift-info/add',
        component: ShiftInfoFormComponent,
    },
    {
        path: 'shift-info-view/:id',
        component: ShiftInfoViewFormComponent,
    },
];
