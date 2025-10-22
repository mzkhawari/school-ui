import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from '@fuse/components/fullscreen';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { SharedModule } from 'app/shared/shared.module';
import { CompactLayoutComponent } from 'app/layout/layouts/vertical/compact/compact.component';
import { ExitBackupModule } from 'app/layout/common/exit-backup/exit-backup.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BranchInfoModule } from 'app/layout/common/branch-info/branch-info.module';
import { User1Module } from 'app/layout/common/user/user.module';
import { TranslateModule } from '@ngx-translate/core';
import { ShiftInfoNotiyModule } from 'app/layout/common/shift-info/shift-info-notify.module';
import { FinanceAmountNotifyModule } from 'app/layout/common/treasury-amount-notify/treasury-amount-notify.module';
import { TranactionSuspiciousNotifyModule } from 'app/layout/common/tranaction-suspicious-notify/tranaction-suspicious-notify.module';
import { TranactionSuspiciousNotifyFollowModule } from 'app/layout/common/tranaction-suspicious-notify-follow/tranaction-suspicious-notify-follow.module';
import { AccountLicenseExpiredNotifyModule } from 'app/layout/common/account-license-expired-notify/account-license-expired-notify.module';
import { tranactionHighRiskNotifyModule } from 'app/layout/common/tranaction-high-risk-notify/tranaction-high-risk-notify.module';
import { AccountCustomerCheckNotifyModule } from 'app/layout/common/account-customer-check-notify/account-customer-check-notify.module';
import { BranchMinTreasuryNotifyModule } from 'app/layout/common/branch-min-treasury-notify/branch-min-treasury-notify.module';

@NgModule({
    declarations: [
        CompactLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseNavigationModule,
        LanguagesModule,
        User1Module,
        MessagesModule,
        ExitBackupModule,
        NotificationsModule,
        ShiftInfoNotiyModule,
        FinanceAmountNotifyModule,
        TranactionSuspiciousNotifyModule,
        tranactionHighRiskNotifyModule,
        TranactionSuspiciousNotifyFollowModule,
        AccountLicenseExpiredNotifyModule,
        BranchMinTreasuryNotifyModule,
        AccountCustomerCheckNotifyModule,
        SearchModule,
        ShortcutsModule,
        BranchInfoModule,   
        SharedModule,
        TranslateModule,
        MatTooltipModule
    ],
    exports     : [
        CompactLayoutComponent
    ]
})
export class CompactLayoutModule
{
}
