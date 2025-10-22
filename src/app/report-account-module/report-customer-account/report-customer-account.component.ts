import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { ReportSearchConfigDto } from 'app/report-search-module/models/report-search-config.dto';
import { ReportSearchAccountDto } from 'app/report-search-module/models/report-search-account.dto';

@Component({
  selector: 'app-report-customer-account',
  templateUrl: './report-customer-account.component.html',
})
export class ReportCustomerAccountComponent implements OnInit {

  datasource : any[]=[];
  dataHeader:any={};
  accessItem :AccessItemDto;
  private baseUrlApi : string = "";
  returnUrlAddress:any='/index-info';
    constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService ) {
      this.baseUrlApi = Globals.UrlTransaction ;
   }

   columns = [           
   
    {
      dataField:"accountNo",
      alignment:"center",
      caption: this.translate.instant('account-number'),
    },          
    {
      dataField:"firstName",
      alignment:"center",
      caption: this.translate.instant('name'),
    },
    {
      dataField:"lastName",
      alignment:"center",
      caption: this.translate.instant('last-name'),
    },
    {
      dataField:"fatherName",
      alignment:"center",
        caption: this.translate.instant('father-name'),
       },
       {
           dataField:"phoneNumber",
      alignment:"center",
        caption: this.translate.instant('contact-number'),
    },
    {
      dataField:"typeAccount",
      alignment:"center",
        caption:this.translate.instant('account-type'),
    },
    {
      dataField:"identityTypeTitle",
      alignment:"center",
        caption: this.translate.instant('type-of-identity-document'),
    },
    {
      dataField:"identityNo",
      alignment:"center",
        caption: this.translate.instant('identity-document-number'),
    },
    {
      dataField:"provinceTitle",
      alignment:"center",
        caption:this.translate.instant('province'),
    },   
    {
      dataField:"cityTitle",
      alignment:"center",
        caption:this.translate.instant('city'),
    },   
    {
      dataField:"genderTitle",
      alignment:"center",
        caption: this.translate.instant('gender'),
    },   
    {
      dataField:"isCheckPunishment",
      alignment:"center",
        caption:this.translate.instant('the-sanctions-were-checked'),
    },   
    {
      dataField:"isPEP",
      alignment:"center",
        caption:this.translate.instant('includes-PEP'),
    },     
    {
      dataField:"accountJobTitle",
      alignment:"center",
      caption:this.translate.instant('source-of-income'),
    },
    {
      dataField:"sourceIncome",
      alignment:"center",
      caption:this.translate.instant('revenue-source-department'),
    },
    {
      dataField:"job",
      alignment:"center",
      caption:this.translate.instant('job'),
    },
    {
      dataField:"mountlyIncome",
      alignment:"center",
      caption:this.translate.instant('monthly-income'),
      format: {
        type: "fixedPoint",
        precision: 2
      },
    },  
    {
      dataField:"dangerLevelTitle",
      alignment:"center",
      caption:this.translate.instant('risk-level'),
    },   
    {
      dataField:"createDateFa",
      alignment:"center",
      caption:this.translate.instant('registration-date'),
    },   
    {
      dataField:"branchTitle",
      alignment:"center",
      caption:this.translate.instant('registered-branch'),
    },   
    {
      dataField:"accountStatusTitle",
      alignment:"center",
        caption: this.translate.instant('account-status'),
    },   
  ];
  
    titlelist: string;

  statusValue:any =0;  
  configSearch:ReportSearchConfigDto;
  ngOnInit() {    
    this.configSearch = {
      isAccountFrom : false,
      isAccountTo : false,
      isBranchFrom : false,
      isBranchTo : false,
      isCurrencyFrom : false,
      isCurrencyTo : false,
      isDateFrom : false,
      isDateTo : false,
      isTransactionNo : false,
      isTransactionStatus :false,
      isTransactionType :false,
      isTypeAccount: true,
    }
      this.titlelist = this.translate.instant('individual-customer-account-report');// this.tranlate.instant("report.transaction.title");
  }

  onPrint(){

    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html dir='rtl' >
        <head>
          <title>پرینت کارت مشتری</title>
          <link href="../../../../assets/webfont/IranSans/iransans-font.css" rel="stylesheet">
          <style>
          body table,td,th{
            font-family:'iran-sans-serif';
          }
          </style>            
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
}

  onSearchReport(model:ReportSearchAccountDto){
    this.splashScreenService.show();
    this.crudService.postDataUrl(Globals.UrlTransactionReport, "reportCustomerAccount", model).subscribe(res=>{
      this.splashScreenService.hide();
      this.datasource = res.data;
      this.dataHeader = res.header;
    },
    error =>{
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
    });
  }
}
