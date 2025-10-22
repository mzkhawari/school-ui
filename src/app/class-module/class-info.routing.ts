import { Route } from '@angular/router';
import { PeriodListComponent } from './period/period-list.component';
import { PeriodFormComponent } from './period/period-form/period-form.component';
import { ClassInfoListComponent } from './class-info/class-info-list.component';

export const classInfoRoutes: Route[] = [
    {
        path: 'period-list',
        component: PeriodListComponent,
    },
    {
        path: 'period/add',
        component: PeriodFormComponent,
    },

    {
        path: 'class-info',
        component: ClassInfoListComponent,
    },

];
