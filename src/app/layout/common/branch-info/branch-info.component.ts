import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { Router } from '@angular/router';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import Globals from 'app/common-service/globals';
import { BranchDto } from 'app/branch-module/models/branch.dto';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector       : 'branch-info',
    templateUrl    : './branch-info.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'branch-info'
})
export class BranchInfoComponent implements OnInit, OnDestroy
{
    constructor(
        public translate: TranslateService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _shortcutsService: ShortcutsService,
        private _router:Router,
        private _crudService:BaseCrudService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private authService: AuthenticateService

    )
    {
        this.getItem();
    }


    /**
     * On init
     */

    branchInfo:BranchDto;
    roleTitle:string = '';
    ngOnInit(): void
    {
        
        let bInfo =this.authService.getBranchInfo();
        this.branchInfo = JSON.parse(bInfo);
        if(bInfo==null || bInfo == undefined || bInfo ==""){
            this.branchInfo = new BranchDto();
            this.branchInfo.title =this.translate.instant('uncertain')
        }
         
        this.roleTitle = this.authService.getUserRoleTitle();
    }

    model:any=[];
    private getItem() {
        this._crudService.getDataUrl(Globals.UrlBranchReport, "myCurrentBranch").subscribe(res => {
            this.branchInfo = res;
            //this.roleTitle = `${this.authService.getUserRoleTitle()} - ${this.branchInfo.title}`
        },
        error => {
          this.model =[];
        });
      }


    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }

    gotoIndex(){
        this._router.navigateByUrl('/index-info')
    }

    /**
     * Open the shortcuts panel
     */
    openPanel(): void
    {
    }


}
