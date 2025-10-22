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
    selector       : 'app-account-customer-check-notify',
    templateUrl    : './account-customer-check-notify.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'app-account-customer-check-notify'
})
export class AccountCustomerCheckNotifyComponent implements OnInit, OnDestroy
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
    // isLoading2 :boolean=true;
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

        connection.start().then(function () {  
            console.log('SignalR Connected!');  
        }).catch(function (err) {
            return console.log(err.toString());  
        });  
        
        connection.on("BroadcastMessage", () => {
            console.log('SignalR Update Requested');    
            this.getItem();  
        }); 
        if (!this.dataValue) {
            this.isLoading=false;
            // this.isLoading2=true;
         }else if (this.dataValue) {
            this.isLoading=true;
            // this.isLoading2=false;
         } 
    }


    dataValue:any[]=[];
    dataValueCount :number =0;
    isFisrtTime:boolean = false;
    refreshCounter:boolean = false;
    type:number =0;
    private getItem() {
        this.crudService.getDataUrl(Globals.UrlTransactionReport, `reportCustomerAccountCheckNotify/${this.type}`).subscribe(res => {
            this.isFisrtTime = this.refreshCounter = this.unreadCount==0;
            if(this.type==0){
                this.unreadCount = this.dataValueCount = res.count;                
            }else{
                this.dataValue = res.data;     
                if(this.unreadCount != res.count){
                    this.refreshCounter = true;             
                    this.unreadCount = res.count;    
                }                
            }
            // this.dataValueCount = res.dataCount;
            // this.unreadCount = this.dataValue.length;
            if(this.refreshCounter){
                const notify: any = document.querySelector("#nofiyAccountCustomerCheck");
                if (notify != null)
                    notify.click();
                this.closePanel();
            }
        },
          error => {
            //this.splashScreenService.hide();
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

        if(!this.isFisrtTime && this.dataValue.length ==0 ){
            this.type=1;
            this.getItem();
        }else{
            this.type=0;
        }
        this.isFisrtTime =false;
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
