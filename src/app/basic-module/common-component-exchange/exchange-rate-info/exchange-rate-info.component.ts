import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import Globals from '../../../common-service/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-exchange-rate-info',
    templateUrl: './exchange-rate-info.component.html',
})

export class ExchangeRateInfoComponent implements OnInit {

    dataSource: any[] = [];

    constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        private toastMessageService: ToastMessageService) {
    }

    columns:any[]=[]
    ngOnInit() {
        setTimeout(()=>{
            this.get();
            this.columns = [
                // {
                //     dataField: "branchTitle",
                //     alignment: "center",
                //     caption: this.translate.instant('branch'),
                // },
                {
                    dataField: "currencyTitle",
                    alignment: "center",
                    caption: "نام کلاس",
                },
                {
                    dataField: "createDate",
                    alignment: "center",
                    caption: "نام استاد" // this.translate.instant('creation-date'),
                },
                {
                    dataField: "rateBuy",
                    alignment: "center",
                    caption: 'ساعت شروع' //this.translate.instant('rate-buy'),
                },
                {
                    dataField: "rateSell",      
                    alignment: "center",                    
                    caption: 'ساعت اتمام'  // this.translate.instant('rate-sell'),
                },
            ];
        
          },1000);
    }

    private get() {
        this.crudService.getDataUrl(Globals.UrlTransaction, "GetBuySellRate").subscribe(res => {
            const data = res;
            this.dataSource = data;
        },
            error => {
                this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
            });
    }




}
