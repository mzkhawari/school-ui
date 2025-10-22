import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import Globals from '../../../common-service/globals';
import { TranslateService } from '@ngx-translate/core';
import { BranchDto } from 'app/branch-module/models/branch.dto';

@Component({
    selector: 'app-treasury-amount-info',
    templateUrl: './treasury-amount-info.component.html',
})

export class FinanceAmountInfoComponent implements OnInit {


    dataSource: any[] = [];

    constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        private toastMessageService: ToastMessageService) {
    }

    columns:any[]=[];
    titleCom="";
    isShowCom:boolean=false;
    ngOnInit() {
        this.titleCom = this.translate.instant('selected-branch-expenses');
        this.getOption();
        
        setTimeout(()=>{
            this.get();
            this.columns = [                
                {
                    dataField: "id",
                    alignment: "center",
                    caption:this.translate.instant('id'),
                    visible:false
                },
                {
                    dataField: "amount",
                    alignment: "center",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    },
                    caption: this.translate.instant('amount')
                },
                {
                    dataField: "currencyTitle",
                    alignment: "center",
                    caption: this.translate.instant('currency')
                },
                {
                    dataField: "accCodeTitle",
                    alignment: "center",                    
                    caption: this.translate.instant('type-of-use')
                },
            ];
        
          },1000);
    }
    
    onSelectItem($event){
        this.branchId = $event.value
        this.get();
    }
    
    private get() { // مصارف شعبه
        this.crudService.getDataUrl(Globals.UrlTreasuryReport, `reportFinanceAmountBranches/${this.branchId}`).subscribe(res => {
            const data = res;
            this.dataSource = data.data;
            this.isShowCom = data.isCenter;
            if(!data.isCenter){
                this.titleCom = this.translate.instant('branch-expenses')
            }
        },
        error => {
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
        });
    }

    branches:BranchDto[]=[];
    branchId:number =0;
    getOption() {
        this.crudService.getDataUrl(Globals.UrlTreasuryReport, "GetSelectOptions").subscribe(res => {
            this.branches = res.branch;
        },
        error => {
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
        });
    }
}
