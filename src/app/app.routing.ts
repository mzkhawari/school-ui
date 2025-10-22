import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { IndexInfoComponent } from './basic-module/common-component-exchange/index-info/index-info.component';
import { SignInComponent } from './basic-module/auth-module/sign-in/sign-in.component';
import { AuthGuard } from './common-service/security-service/_guard/auth.gaurd';
import { InitialDataResolver } from './app.resolvers';
import { ResetPasswordComponent } from './basic-module/user-module/reset-pasword/reset-password.component';

export const appRoutes: Route[] = [

    
    { path: '', pathMatch: 'full', redirectTo: '/auth/sign-in' },
    // {
    //     path: 'auth/sign-in',
    //     pathMatch: 'full',
    //     component: SignInComponent,
    // },
    
    
    // { 
    //     path: 'index-info', 
    //     canActivate:[AuthGuard],
    //     component: IndexInfoComponent, 
    // },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: '/index-info' },
    //{ path: '', pathMatch: 'full', redirectTo: '/index-info' },

    // Apps
    {
        path: 'apps', component: LayoutComponent, children: [
            { path: 'chat', loadChildren: () => import('app/chat/chat.module').then(m => m.ChatModule) },
        ]
    },
    // {
    //     path: '',
    //     component: VitrinLayoutComponent,
    //     children: [
    //         {
    //             path: 'index',
    //             component: IndexComponent,
    //         },
    //         {
    //             path: '',
    //             loadChildren: () => import('./vitrin-module/vitrin.module').then(m => m.VitrinModule)
    //         },
    //         { path: '**', redirectTo: '404-not-found' }
    //     ]
    // },


    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: '',
                component: SignInComponent,
            },
            {
                path: 'force-reset-password',
                component: ResetPasswordComponent,
            },
            {
                path: 'auth', loadChildren: () => import('app/basic-module/auth-module/auth-info.module').then(m => m.AuthInfoModule)
            }
        ]
    },
    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'index-info',
                component: IndexInfoComponent,
            },

            //exchange_app
            {
                path: 'basic', children: [
                    { path: 'user', loadChildren: () => import('app/basic-module/user-module/user.module').then(m => m.UserModule) },
                    { path: 'province-city', loadChildren: () => import('app/basic-module/country-province-city/country-province-city.module').then(m => m.CountryProvinceCityModule) },
                ]
            },
            {
                path: 'class',
                loadChildren: () => import('app/class-module/class-info.module').then(m => m.ClassInfoModule)
            },
            {
                path: 'student',
                loadChildren: () => import('app/student-module/student.module').then(m => m.StudentModule)
            },
            {
                path: 'branch',
                loadChildren: () => import('app/branch-module/branch.module').then(m => m.BranchModule)
            },
            {
                path: 'shift',
                loadChildren: () => import('app/shift-module/shift.module').then(m => m.ShiftModule)
            },
           
            {
                path: 'report',
                loadChildren: () => import('app/report-account-module/report-account-module.module').then(m => m.ReportAccountModule)
            },
            // {
            //     path: 'setting',
            //     loadChildren: () => import('app/setting-web-module/setting-web.module').then(m => m.SettingWebModule)
            // },
            {
                path: 'log-record',
                loadChildren: () => import('app/basic-module/log-record-module/log-record.module').then(m => m.LogRecordModule)
            },
            

            { path: '**', redirectTo: '404-not-found' }
        ]
    },

    // {
    //     path: '',
    //     //canActivate: [AuthGuard],
    //     //canActivateChild: [AuthGuard],
    //     component: LayoutComponent,
    //     resolve: {
    //         initialData: InitialDataResolver,
    //     },
    //     children: [
    //         {
    //             path: 'dress', 
    //             loadChildren: () => import('app/dress-module/dress.module').then(m => m.DressModule) 
    //         },            
    //     ]
    // },
    {
        path: '**',
        redirectTo: 'index-info'
    },
    { path: '**', redirectTo: '404-not-found' }
];
