import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { TranactionSuspiciousNotifyComponent } from './tranaction-suspicious-notify.component';


@NgModule({
    declarations: [
        TranactionSuspiciousNotifyComponent
    ],
    imports     : [
        RouterModule,
        OverlayModule,
        PortalModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,        
        SharedModule
    ],
    exports     : [
        TranactionSuspiciousNotifyComponent
    ]
})
export class TranactionSuspiciousNotifyModule
{
}
