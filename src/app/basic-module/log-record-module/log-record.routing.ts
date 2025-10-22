import { Route } from '@angular/router';
import { LogRecordInfoComponent } from './log-record-info/log-record-info.component';

export const logRecordRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',        
        component: LogRecordInfoComponent,                                         
    },    
    
];
