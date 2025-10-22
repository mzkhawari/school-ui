import { Component, Input, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import Globals from '../../../common-service/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-treasury-info',
    templateUrl: './treasury-info.component.html',
})

export class TreasuryInfoComponent implements OnInit {

    @Input()
    type: 1 | 2 | 3 | 4| 0 = 0; // 1 = treasury amount cash headOffice , 2 = treasury in current      , 3 = treasury amount in branches , 4 Current Branch

    dataSource: any[] = [];

    constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        private toastMessageService: ToastMessageService) {
    }

    columns: any[] = [];
    titleCom: string = '';
    isShowCom = false;
    ngOnInit() {
        if (this.type == 1) {
            this.titleCom = this.translate.instant('cash-and-bank-balance');
        } else if (this.type == 2) {
            this.titleCom = this.translate.instant('cash-and-bank-balance');
        } else if (this.type == 3) {
            this.titleCom = this.translate.instant('treasury-balance-of-affected-branches');
        } else if (this.type == 4) {
                this.titleCom = this.translate.instant('treasury-balance-of-affected-branches');
        }

        setTimeout(() => {
            this.get();
            if (this.type == 1) {
                this.columns = [
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
                        caption:this.translate.instant('financial-account')
                    }                    
                    // {
                    //     dataField: "branchTitle",
                    //     alignment: "center",
                    //     caption: this.translate.instant('home-page.treasure.table.branch')
                    // }
                ];
            } else {
                this.columns = [
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
                        caption:this.translate.instant('financial-account')
                    }];
               }

        }, 1000);
    }

    private get() {
        let typeMethod = "";
        if (this.type == 1) {
            typeMethod = "reportFinanceAmountBalanceCenter";
        } else if (this.type == 2) {
            typeMethod = "reportFinanceAmountBalanceBranch";
        } else if (this.type == 3) {
            typeMethod = "reportFinanceAmountBalanceAllBranch";
        } else if (this.type == 4) {
            typeMethod = "reportFinanceAmountBalanceCurrentBranch";
        }

        this.crudService.getDataUrl(Globals.UrlTreasuryReport, typeMethod).subscribe(res => {
            const data = res;
            if (this.type == 1) {
                if (res.isCenter) {
                    this.dataSource = res.data;
                    this.isShowCom = true;
                }
            } else if (this.type == 3) {
                if (res.isCenter) {
                    this.dataSource = res.data;
                    this.isShowCom = true;
                }
            } else if (this.type == 4) {
                if (!res.isCenter) {
                    this.dataSource = res.data;
                    this.isShowCom = true;
                }
            } else {
                if (!res.isCenter) {
                    this.dataSource = res.data;
                    this.isShowCom = true;
                }
            }
        },
            error => {
                this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
            });
    }




}
