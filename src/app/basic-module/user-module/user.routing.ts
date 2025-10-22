import { Route } from '@angular/router';
import { AccessKeyRoleUserComponent } from './accesskey-role-user/accesskey-role-user.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ResetPasswordComponent } from './reset-pasword/reset-password.component';
import { UserLogReportComponent } from './reporting/user-log-report/user-log-report.component';
import { UserReportComponent } from './reporting/user-report/user-report.component';
import { UserFormComponent } from './user-info/user-form/user-form.component';
import { UrlRedirectComponent } from './url-redirect/url-redirect.component';
import { AccessKeyProvinceComponent } from './accesskey-province/accesskey-province.component';
import { AccessKeyBranchComponent } from './accesskey-branch/accesskey-branch.component';

export const userRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: UserInfoComponent,
    },
    {
        path: 'edit/:id',
        component: UserFormComponent,
    },
    {
        path: 'user-role',
        component: UserRoleComponent,
    },
    {
        path: 'access-role-user',
        component: AccessKeyRoleUserComponent,
    },
    {
        path: 'access-province',
        component: AccessKeyProvinceComponent,
    },
    {
        path: 'access-branch',
        component: AccessKeyBranchComponent,
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    },
    {
        path: 'user-log-report',
        component: UserLogReportComponent,
    },
    {
        path: 'user-report',
        component: UserReportComponent,
    },

    {
        path: 'url-redirect/:id',
        component: UrlRedirectComponent,
    },


];
