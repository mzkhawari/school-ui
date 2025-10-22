import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class LoadingSplashScreenService
{
    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _router: Router
    )
    {
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                this.hide();
            });

        this._router.events
            .pipe(
                filter(event => event instanceof NavigationStart),
                take(1)
            )
            .subscribe(() => {
                this.show();
            });
    }

    isShowing:boolean = false;

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the splash screen
     */
    show(): void
    {
        this._document.body.classList.remove('splash-screen-hidden');
        this.isShowing =true;
        setTimeout(() => {
            this.hide();            
        }, 80000);
    }

    /**
     * Hide the splash screen
     */
    hide(): void
    {
        this.isShowing =false;
        this._document.body.classList.add('splash-screen-hidden');
    }
}
