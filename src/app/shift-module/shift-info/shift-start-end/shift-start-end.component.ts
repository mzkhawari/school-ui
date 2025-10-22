import { Component, OnInit, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import * as moment from 'moment';


@Component({
  selector: 'app-shift-start-end',
  templateUrl: './shift-start-end.component.html',
  styleUrls: ['./shift-start-end.component.html'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShiftStartEndComponent),
      multi: true
    },
  ]
})
export class ShiftStartEndComponent implements OnInit {



  
  optionSelect: any = null;


    constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private activateRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<ShiftStartEndComponent>,
    private router: Router,
    private accessKeywordService:AccessKeywordService,
    private toastMessageService: ToastMessageService) {
  }

  branchTitle:string ='';
  returnUrlAddress = '';
  isOpenShift:number = 2;
  ngOnInit() {

    // if(!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_BALANCE_SHEET_Daily)){
    //   this.toastMessageService.showToast(NbToastStatus.WARNING, "پیام" , "شما دسترسی به افزودن در لیست این بخش ندارید");
    //   this.router.navigateByUrl('index-info');
    //   return;
    // }  

    this.getOption();
    this.returnUrlAddress = '';

    this.returnUrlAddress = 'shift/shiftinfo-list';
    //this.getItem();
    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      this.currentSelectedShiftId = id;
      this.getItem(id);
    } else {
      this.getItem(0);
    }
  }
  currentSelectedShiftId:number =0;

  isPrintMode:boolean= false;
  modelFooter:any={
    name:'',
    name1:'نام را وارد کنید ',
    branch:'',
    branch1:'',
    date:'',
    date1:'',
    duty:'',
    duty1:''
  };

  

  onPrintReport() {   //itemStep  1: print , 2 export excel , 3 : export excel
    this.isPrintMode = true;
    setTimeout(() => { // Wait Until Replace Input With spann
      this.printDialog();
    }, 1000);
  }


  


  printDialog(){
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto,scaleY(2.5)');
    popupWin.document.open();
    popupWin.document.write(`
      <html dir='rtl' >
        <head>
          <title>پرینت  بیلانس روزانه 
          </title>
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
    this.isPrintMode = false;
    popupWin.document.close();
  }


  getOption() {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlBranch, "GetSelectOptions").subscribe(res => {
      this.splashScreenService.hide();
    },
    error => {
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
    });
  }

  


  dataCurrentAssets:any[]=[];
  cashes:any[]=[];
  dataStart:any[]=[];
  dataEnd:any[]=[];
  banks:any[]=[];
  cashesPerv:any[]=[];
  banksPerv:any[]=[];
  netIncome:any[]=[];
  fixedTangibleInTangibles:any[]=[];
  //accountReciveables:any[]=[];
  //expences:any[]=[];
  accountPaidables:any[]=[];
  otherAssets:any[]=[];
  liabilitiesOthers:any[]=[];

  dataFunds:any[]=[];
  dataCurrentLiabilities:any[]=[];
  diffInExchange:0;
  totalCurrentAssets:number =0;
  totalFixAssets:number =0;
  totalFunds:number =0;
  totalBankCashs:number =0;
  totalFixedTangibleInTangibles:number =0;
  totalAccountReciveables:number =0;
  totalOtherAssets:number =0;
  totalTotalAssets:number =0;
  totalNetIncome:number =0;
  totalNetIncomePerv:number =0;
  
  totalAccountPaidables:number =0;
  totalExpences:number =0;
  totalLiabilitiesOthers:number =0;
  totalCurrentLiabilities:number =0;
  buySellUsdInfo :any;
  dateFrom: any="2023/01/01";
  dateTo: any= "2023/01/01";
  dateTurnTitle:string="";
  diffStartEnd:number =0;
  getItem(id:number) {
     
    let date = (moment(this.dateFrom)).locale('fa').format('YYYY-MM-DDT00:00:00Z')
    this.dateFrom = date;
   

    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlTransaction ,`getTransactionShiftInfo/${id}`).subscribe(res => {
      this.splashScreenService.hide();
      this.cashes = res.data ;
      debugger;
      this.dataStart = res.dataStart;
      this.dataEnd = res.dataEnd;
      this.buySellUsdInfo = res.buySellUsd;
      let dateHeader = res.dataHeader;
      this.dateFrom = dateHeader.dateFrom;
      this.branchTitle = res.branchTitle;
      this.isOpenShift = res.isOpenshift;
      this.currentSelectedShiftId = res.currentShiftId;

      if(this.dataEnd.length >0 ){
        if(this.dataStart.length >0){
          this.diffStartEnd = parseFloat(this.dataEnd[0].amountUsdToAfg) - parseFloat(this.dataStart[0].amountUsdToAfg);
        }else{
          this.diffStartEnd = this.dataEnd[0].amountUsdToAfg ;
        }
      }
      // this.cashes =  res.bankCash;
      // this.cashesPerv = res.bankCashPerv;
      // this.netIncome = res.netIncome;


      // this.fixedTangibleInTangibles = res.fixedTangibleInTangible;
      // this.otherAssets = res.otherAsset;
      // this.totalNetIncome = res.netIncome;
      // this.totalNetIncomePerv = res.netIncomePrev;
      // this.dataFunds = res.dataFund;
      // this.accountPaidables = res.accountPaidable;
      // this.liabilitiesOthers = res.liabilitiesOther;
      // this.diffInExchange = res.diffInExchange;
      
      
    },
    error => {
      this.splashScreenService.hide();
    });
  }


  changeShift(){
    if(this.isOpenShift==0){
      this.addShift()
    }else{
      this.closeShiftTreasury();
    }
  }

  
    datainfo: string = "";
    closeShiftTreasury() {
      let model = {
        description: this.datainfo,
        id: this.currentSelectedShiftId
      };
      this.splashScreenService.show();
      this.crudService.postDataUrl(Globals.UrlShiftInfo, "closeShiftInfo", model).subscribe(res => {
        if (res) {
          this.getItem(0);
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
        }
      }, error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
      },
        () => {
          this.splashScreenService.hide();
        })
    }

    public addShift(){
            this.crudService.getDataUrl(Globals.UrlShiftInfo, "createOpenShift").subscribe(res => {
                if (res) {
                    //this.dataValue = res;
                    //this.unreadCount = res !==null ? 1 : 0;
                    //this.hasShift =  !(res ==null || res ==undefined);
                    this.getItem(res.id);
                    this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success'),this.translate.instant('shift-created-successfully'))
                } else {
                    this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('warning'), res)
                }
                }, error => {
                    this.splashScreenService.hide();
                    this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
                },
                () => {
                    this.splashScreenService.hide();
                })
        }  
  

  calculateSum(array, property) {
    const total = array.reduce((accumulator, object) => {
      return accumulator + parseInt((object[property] == undefined ? 0 : object[property]));
    }, 0);

    return total;
  }
}
