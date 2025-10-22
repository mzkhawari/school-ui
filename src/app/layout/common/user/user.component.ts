import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import Globals from 'app/common-service/globals';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    //user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */

     user:UserDto;
    constructor(
        public translate: TranslateService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private authService:AuthenticateService,
        private _userService: UserService
    )
    {
        let value = Globals.findUserInfo();  
        this.user = value.currentUser;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
            

        // Subscribe to user changes
        // this._userService.user$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((user: User) => {
        //         this.user = user;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void
    {
        // Return if user is not available
        if ( !this.user )
        {
            return;
        }

        // Update the user
        // this._userService.update({
        //     ...this.user,
        //     status
        // }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void
    {
        this.authService.logout();
        //this._router.navigate(['/auth/sign-out']);
    }

    gotoPage(itemUrl){
        if(itemUrl=='change-pass'){
            this._router.navigate(['/basic/user/reset-password']);
        }else if(itemUrl=='edit'){
            this._router.navigateByUrl(`/basic/user/edit/${this.user.id}`);
        }else if(itemUrl=='back-up'){
            this._router.navigateByUrl(`/basic/user/edit/${this.user.id}`);
        }
        

    }
}
