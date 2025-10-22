import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { Router } from '@angular/router';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector       : 'exit-backup',
    templateUrl    : './exit-backup.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'exit-backup'
})
export class ExitBackupComponent 
{
    constructor(
        public translate: TranslateService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _messagesService: MessagesService,
        private authService:AuthenticateService, 
        private _overlay: Overlay,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef
    )
    {
    }

    logOutApp(){
        this.authService.logout();

        //this._router.navigateByUrl('/auth/sign-out');
    }
}
