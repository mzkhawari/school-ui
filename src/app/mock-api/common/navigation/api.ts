import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data-fa';
import { compactNavigation_pa, defaultNavigation_pa, futuristicNavigation_pa, horizontalNavigation_pa } from 'app/mock-api/common/navigation/data-pa';
import { compactNavigation_en, defaultNavigation_en, futuristicNavigation_en, horizontalNavigation_en } from 'app/mock-api/common/navigation/data-en';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    private  _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private  _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private  _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private  _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private translate: TranslateService, private router: Router, private crudService:BaseCrudService, private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
        //this.getItem();
    }

    model:any=[];
    private getItem() {
        this.crudService.getInclude(Globals.UrlAccessKeyRoleUser).subscribe(res => {
          this.model = res;
          this.registerHandlers();
        },
        error => {
          this.model =[];
        });
      }
    


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        let accessKeys = Globals.findAccessKey();//  this.model;\
        if(accessKeys==null){
            this.router.navigateByUrl('auth/sign-in')
            return ;
        }
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        let lang = localStorage.getItem('lang');
        if(lang=='fa'){
            this._compactNavigation = compactNavigation;
            this._defaultNavigation = defaultNavigation;
            this._futuristicNavigation = futuristicNavigation;
            this._horizontalNavigation = horizontalNavigation;
        }else if(lang=='pa'){
            this._compactNavigation = compactNavigation_pa;
            this._defaultNavigation = defaultNavigation_pa;
            this._futuristicNavigation = futuristicNavigation_pa;
            this._horizontalNavigation = horizontalNavigation_pa;
        }else if(lang=='en'){
            this._compactNavigation = compactNavigation_en;
            this._defaultNavigation = defaultNavigation_en;
            this._futuristicNavigation = futuristicNavigation_en;
            this._horizontalNavigation = horizontalNavigation_en;
        }else{
            this._compactNavigation = compactNavigation;
            this._defaultNavigation = defaultNavigation;
            this._futuristicNavigation = futuristicNavigation;
            this._horizontalNavigation = horizontalNavigation;
        }


        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                 
                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = [];
                            let dataMenu = cloneDeep(defaultNavItem.children);                             
                            if(dataMenu!==undefined){
                                dataMenu.forEach(element => {
                                    let link =  element.link.toLowerCase();
                                    let isExist = accessKeys.find(f=>f.urlRequest !=null && (f.urlRequest.toLowerCase().startsWith(link) || f.urlRequest.toLowerCase().endsWith(link)))
                                    if(isExist==undefined || isExist == null){
                                        element.disabled = true  ;                                        
                                    }else{
                                        compactNavItem.children.push(element)
                                    }
                                    if(compactNavItem.children.length==0){
                                        compactNavItem.disabled = true;
                                    }else{
                                        compactNavItem.disabled = false;
                                    }
                                });                                
                            }
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }
}
