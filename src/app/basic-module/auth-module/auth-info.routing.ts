import { Route } from '@angular/router';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const authInfoRoutes: Route[] = [
    // {
    //     path      : '',
    //     pathMatch : 'full',        
    //     component: SignInComponent,                                         
    // },
    {
        path      : 'sign-in',
        pathMatch : 'full',        
        component: SignInComponent,      
    },    
    {
        path      : 'sign-out',
        pathMatch : 'full',        
        component: SignOutComponent,      
    },    
];
