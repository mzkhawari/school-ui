import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Observable, Subject } from 'rxjs';

import { Notification } from 'app/layout/common/notifications/notifications.types';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import * as signalR from '@microsoft/signalr';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector       : 'app-treasury-amount-notify',
    templateUrl    : './treasury-amount-notify.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'app-treasury-amount-notify'
})
export class FinanceAmountNotifyComponent implements OnInit, OnDestroy
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notifications: Notification[];
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public translate: TranslateService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private crudService: BaseCrudService,
        private splashScreenService:LoadingSplashScreenService,
        private _viewContainerRef: ViewContainerRef
    )
    {
    }
    show:boolean=true;
    toggle2(){
    this.show=!this.show
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    isLoading :boolean=false;
    isLoading2 :boolean=true;
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getItem();

        const connection = new signalR.HubConnectionBuilder()  
        .configureLogging(signalR.LogLevel.Information)  
        .withAutomaticReconnect([15000,30000,45000,60000])
        .withUrl(`${Globals.urlServerNotify}info/notify` , {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        }) 
        .build();  

        connection.start().then(function () {  
            console.log('SignalR Connected!');  
        }).catch(function (err) {  
            return console.error(err.toString());  
        });  
        
        connection.on("BroadcastMessage", () => {
            console.log('SignalR Update Requested');    
            this.getItem();  
        });  
        if (!this.dataValue) {
            this.isLoading=false;
            this.isLoading2=true;
         }else if (this.dataValue) {
            this.isLoading=true;
            this.isLoading2=false;
         }
    }


    dataValue:any[]=[];
    isFirstTime:boolean = true;
    refreshCounter:boolean = false;
    private getItem() {
        this.isFirstTime = this.refreshCounter = this.unreadCount==0;
        this.crudService.getDataUrl(Globals.UrlFinanceMasterReport, `GetNewFinanceAmount/${(this.isFirstTime?0:1)}`).subscribe(res => {
            if(this.isFirstTime){
                this.unreadCount = res.count;                
            }else{
                this.dataValue = res.data;
                if(this.unreadCount != res.count){
                    this.refreshCounter = true;             
                    this.unreadCount = res.count;    
                }                
            }

            if(this.refreshCounter){
                const notify:any = document.querySelector("#nofiyFinanceAmount");
                notify.click();
                this.closePanel();
            }
          
        },
          error => {
            this.splashScreenService.hide();
          });
      }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        //this._unsubscribeAll.next();
        //this._unsubscribeAll.complete();

        // Dispose the overlay
        // if ( this._overlayRef )
        // {
        //     this._overlayRef.dispose();
        // }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void
    {
        // Return if the notifications panel or its origin is not defined
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
        if(!this.isFirstTime && this.dataValue.length ==0){
            this.getItem();
        }
        this.isFirstTime = false;
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
