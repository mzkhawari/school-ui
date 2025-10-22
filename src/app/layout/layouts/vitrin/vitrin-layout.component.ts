import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import Globals from 'app/common-service/globals';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageService } from 'app/common-service/service/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector     : 'vitrin-layout',
    templateUrl  : './vitrin-layout.component.html',
    styleUrls  : ['./vitrin-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VitrinLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    webpageInfos:any[]=[];
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private crudService:BaseCrudService,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _translocoService: TranslocoService,
        private languageService: LanguageService,
        public translate: TranslateService,
        private _fuseNavigationService: FuseNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    footerAddress:any;
    footerLastNews:any[]=[];
    footerCatNews:any[]=[];
    /**
     * On init
     */

    currentUrl:string="/index";
    ngOnInit(): void
    {
        this.currentUrl = this._router.url; 
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

             
            let lang = this.languageService.getActiveLang();
            this.crudService.getDataUrl(Globals.UrlVitrin,`webpageinfo/${lang}`).subscribe(res=>{
                this.webpageInfos = res;
            });

            this.crudService.getDataUrl(Globals.UrlVitrin,`footerInfo/${lang}`).subscribe( res =>{
                this.footerAddress = res.address
                this.footerLastNews = res.lastNews
                this.footerCatNews = res.catNews
            });
    }

    status:boolean =false;
    @ViewChild("menu")  menu : ElementRef;
    //menu = document.getElementById('menu');
        toggleMenu() {
            this.status = !this.status;
             
            //this.menu.nativeElement.setAttribute('class','hidden');
            //this.menu.nativeElement.setAttribute('class','w-full');
            //this.menu.nativeElement.setAttribute('class','h-screen');
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
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        this._router.navigateByUrl("/index-info");
    }
}
