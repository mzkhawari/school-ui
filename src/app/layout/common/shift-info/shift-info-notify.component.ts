import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import * as signalR from '@microsoft/signalr';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector       : 'shift-info-notify',
    templateUrl    : './shift-info-notify.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'shift-info-notify'
})
export class ShiftInfoNotifyComponent implements OnInit, OnDestroy
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notifications: Notification[];
    unreadCount: number = 0;
    hasShift:boolean = false;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public translate: TranslateService,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private router:Router,
        private crudService: BaseCrudService,
        private splashScreenService:LoadingSplashScreenService,
        private _viewContainerRef: ViewContainerRef
    )
    {
            this.router.events.subscribe((event: any) => {
              if (event instanceof NavigationStart) {
              }
        
              if (event instanceof NavigationEnd) {
                if(event.url.includes('treasury-view-shift')){
                    this.getItem();
                }
            }
        
              if (event instanceof NavigationError) {
                   // Hide progress spinner or progress bar
                  // Present error to user
                   
              }
          });
    }

    

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
       this.getItem();
        
        const connection = new signalR.HubConnectionBuilder()  
        .configureLogging(signalR.LogLevel.Information)  
        .withAutomaticReconnect([15000,30000,45000,60000])
        .withUrl(`${Globals.urlServerNotify}info/notify`)   
        .build();  
    }

    dataValue:any[]=[];
    private getItem() {
        this.splashScreenService.show();
        this.crudService.getDataUrl(Globals.UrlShiftInfoReport , "getCurrentShiftInfo").subscribe(res => {
          this.splashScreenService.hide();
          this.dataValue = res;
          this.unreadCount = res !==null ? 1 : 0;
          this.hasShift =  !(res ==null || res ==undefined);

            const notify: any = document.querySelector("#nofiyShift");
            if (notify != null)
                notify.click();
          this.closePanel();
        },
        error => {
            this.splashScreenService.hide();
        });
      }

    public addShift(){
        let url = this.router.url;
        if(!url.includes('treasury-view-shift')){
            this.router.navigateByUrl('exchange/treasury-view-shift');
        }else{
            this.closePanel();
        }
        // this.crudService.getDataUrl(Globals.UrlShiftInfo, "createOpenShift").subscribe(res => {
        //     if (res) {
        //         this.dataValue = res;
        //         this.unreadCount = res !==null ? 1 : 0;
        //         this.hasShift =  !(res ==null || res ==undefined);
        //         this.toastMessageService.showToast(NbToastStatus.SUCCESS, "موفقیت", "با موفقیت شیفت ایجاد شد")
        //     } else {
        //         this.toastMessageService.showToast(NbToastStatus.DANGER, "هشدار ", res)
        //     }
        //     }, error => {
        //         this.splashScreenService.hide();
        //         this.toastMessageService.showToast(NbToastStatus.DANGER, "خطای سروری", error.Message);
        //     },
        //     () => {
        //         this.splashScreenService.hide();
        //     })
    }  
      

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void
    {

        //this.router.navigateByUrl('exchange/treasury-view-shift');
        //Return if the notifications panel or its origin is not defined
        if ( !this._notificationsPanel || !this._notificationsOrigin )
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

     /**
     * Mark all notifications as read
     */
    markAllAsRead(): void
    {
        // Mark all as read
        this._notificationsService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: Notification): void
    {
        // Toggle the read status
        notification.read = !notification.read;

        // Update the notification
        this._notificationsService.update(notification.id, notification).subscribe();
    }

    /**
     * Delete the given notification
     */
    delete(notification: Notification): void
    {
        // Delete the notification
        this._notificationsService.delete(notification.id).subscribe();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                                  .withLockedPosition(true)
                                  .withPush(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void
    {
        let count = 0;

        if ( this.notifications && this.notifications.length )
        {
            count = this.notifications.filter(notification => !notification.read).length;
        }

        this.unreadCount = count;
    }
}
