import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { ShiftInfoNotifyComponent } from './shift-info-notify.component';

@NgModule({
    declarations: [
        ShiftInfoNotifyComponent
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
        ShiftInfoNotifyComponent
    ]
})
export class ShiftInfoNotiyModule
{
}
