import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyNumberPipe } from 'app/common-module/common-pipe/pipes/currency-number-pipe';
import { ReportSearchConfigDto } from 'app/report-search-module/models/report-search-config.dto';
import { ReportSearchDto } from 'app/report-search-module/models/report-search.dto';
import * as XLSX from 'xlsx';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-presence-absence',
  templateUrl: './report-presence-absence.component.html',
  styleUrls:['./report-presence-absence.component.css']
})
export class ReportPresenceAbsenceComponent implements OnInit {

  @ViewChild('myTable', { static: false }) myTable!: ElementRef;

  @Input()
  dataToPapOp:any[];

  datasource: any[] = [];
  dataHeader: any = {};
  accessItem: AccessItemDto;
  private baseUrlApi: string = "";
  returnUrlAddress: any = '/index-info';
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private currencyNumber: CurrencyNumberPipe,
     public dialogRef: MatDialogRef<ReportPresenceAbsenceComponent>,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.baseUrlApi = Globals.UrlTransaction;
  }

  // columns = [
  //   {
  //     dataField: "typeCheck",
  //     alignment: "center",
  //     caption:this.translate.instant('number2')
  //   },
  //   {
  //     dataField: "typeCheck2",
  //     alignment: "center",
  //     caption:this.translate.instant('zone')
  //   },
  //   {
  //     dataField: "transactionCode",
  //     alignment: "center",
  //     caption:this.translate.instant('province')
  //   },
  //   {
  //     dataField: "branchTitle",
  //     alignment: "center",
  //     caption:this.translate.instant('number-of-remittances-sent')
  //   },
  //   {
  //     dataField: "accountFromAccountNo",
  //     alignment: "center",
  //     caption:this.translate.instant('number-of-remittances-received')
  //   },
  //   {
  //     dataField: "accountFromFullName",
  //     alignment: "center",
  //     width: 200,
  //     caption:this.translate.instant('total-number-of-transactions')
  //   },
  // ];
  titlelist: string;


  configSearch: ReportSearchConfigDto = {
    isAccountFrom: false,
    isAccountTo: false,
    isBranchFrom: false,
    isBranchTo: false,
    
    isCurrencyFrom: false,
    isCurrencyTo: false,
    isDateFrom: false,
    isDateTo: false,
    isTransactionNo: false,
    isTransactionStatus: false,
    isTransactionType: false,

    isCheckPunishment: false,
    isDangerLevel: false,
    isMountlyIncome: false,
    isPEP: false,
    isSourceIncome: false,
    isTargetAccount: false,
    isTIN: false,
    isAmount: false,
    isBranchesConnected: false,
  }
  statusValue: any = 0;
  zoneCounts = new Map<string, number>();
  ngOnInit() {
    this.titlelist = "گزارش وضعیت موجودی با پیش فاکتور"; //this.tranlate.instant("report.transaction.title"); 
    // this.datasource=this.dataToPapOp;
    this.datasource = this.dataToPapOp.sort((a, b) =>
      a.designShoesTitle.localeCompare(b.designShoesTitle)
    );
  
    // محاسبه تعداد هر مدل
    this.datasource.forEach(item => {
      this.zoneCounts.set(item.designShoesTitle,
        (this.zoneCounts.get(item.designShoesTitle) || 0) + 1
      );
    });
  }


  Print() {   //itemStep  1: print , 2 export excel , 3 : export excel
    this.splashScreenService.show();
    setTimeout(() => { // Wait Until Replace Input With spann
      this.printDialog();
      this.splashScreenService.hide();
    }, 5000);
  }

  printDialog(){   //itemStep  1: print , 2 export excel , 3 : export excel
    let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
     <!doctype html>
      <html dir="rtl">
      <head>      
          <title>پرینت</title>            
          <style>
          @import url('/assets/webfont/bNazanin/AtFontFace.css');  

          @font-face {
            font-family: fontPage-BNazanin;
            src: url('/assets/webfont/bNazanin/BNazanin.woff') format('woff'),
                 url('/assets/webfont/bNazanin/BNazanin.woff2') format('woff2');
          }

          @font-face {
            font-family: fontPage-IranSans;
            src: url('/assets/webfont/IranSans/iran-sans-fd-wol.ttf') format('ttf'),
                 url('/assets/webfont/IranSans/iran-sans-fd-wol.eot') format('eot'), 
                 url('/assets/webfont/IranSans/iran-sans-fd-wol.woff') format('woff'),
                 url('/assets/webfont/IranSans/iran-sans-fd-wol.woff2') format('woff2');

                unicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF; 
          }

          body {
              font-family: fontPage-IranSans !important;
              font-weight: 300;
              
          }

          @page {
            size: auto;
          }

          .flex-container{
            display: flex;
            width: 100%;
            }
            
            .flex-container2{
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                line-height: 2;
            }
            
            .flex-title{
                font-size: 11px;
                flex-grow: 2;
            }
            .vertical-th {
              border: 1px solid #271919;
            }
                
              /* Table */
              table { margin: 1px; text-align:left; border-spacing:0 !important; width:100%; word-wrap: break-word;  }
              th { border-bottom: 1px solid #271919;  font-weight: bold; text-align: center; font-size:11px; word-wrap: break-word; }
              td { border-bottom: 1px solid #271919; text-align: center; font-size:10px; word-wrap: break-word; }
              th,td { padding: 2px 1px 2px 1; border: 1px solid #271919; font-size:10px; word-wrap: break-word; }
              tfoot { font-style: italic; }
              caption { background: #fff; margin-bottom:2em; text-align:right; }
              thead {display: table-header-group;}
              img,tr {page-break-inside: avoid;} 
              .row-alterNative{
                background-color: #f5f5f5;
              }
              .row{
                background-color: #f5f5f5;
              }
              .logo2{
                display: flex !important;
                flex-direction: row;
                align-items: center;
              }

              .table td, .table th {
                padding: 0px !important;
                word-wrap: break-word;
              }

              .bootstrap-table .fixed-table-container .table thead th .th-inner {
                padding: 2px !important;
                overflow: visible !important;
                text-align: center;
                white-space: break-spaces !important;
                width: 30px;
                height: 70px;
                word-wrap: break-word;
            }

            .bootstrap-table .fixed-table-container .table thead th.ignoreCss .th-inner {
              padding: 2px !important;
              overflow: visible !important;
              text-align: center;
              white-space: break-spaces !important;
              width: 100%;
              height: 50px;
              word-wrap: break-word;
            }

            .ignorePrint{
              display:none;
            }

              
            tbody tr:nth-child(even) {
              background-color:#eceff1;
            }
  
  
            tbody tr:nth-child(odd) {
              background-color: #ffffff;
            }
            tfoot {
             background-color:#eceff1;
               color: black;
            }
            .color_bg{
              background-color: #eceff1 !important;
            }

            .col-dark{
              background-color: bisque;
            }
          
            .row-dark{
              background-color: #d1dae3;
            }

            p{
              display: block;
              margin-block-start: 0 !important;
              margin-block-end: 0 !important;
            }
          </style>


          <script type="text/javascript" >
          function fnExcelReport()
          {
              var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
              var textRange; var j=0;
              var tab = document.getElementById('table'); // id of table
          
              for(j = 0 ; j < tab.rows.length ; j++) 
              {     
                  tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
                  //tab_text=tab_text+"</tr>";
              }
          
              tab_text=tab_text+"</table>";
              //tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
              //tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
              //tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
          
              var ua = window.navigator.userAgent;
              var msie = ua.indexOf("MSIE "); 
          
              if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
              {
                  txtArea1.document.open("txt/html","replace");
                  txtArea1.document.write(tab_text);
                  txtArea1.document.close();
                  txtArea1.focus(); 
                  sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
              }  
              else                 //other browser not tested on IE 11
                  sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  
          
              return (sa);
          }

          function generate() {  
            var doc = new jsPDF('p', 'pt', 'letter');  
            var htmlstring = '';  
            var tempVarToCheckPageHeight = 0;  
            var pageHeight = 0;  
            pageHeight = doc.internal.pageSize.height;                
            margins = {  
                top: 150,  
                bottom: 60,  
                left: 40,  
                right: 40,  
                width: 600  
            };  
            var y = 20;  
            doc.setLineWidth(2);  
            //doc.text(200, y = y + 30, "TOTAL MARKS OF STUDENTS");  
            doc.autoTable({  
                html: '#table',  
                startY: 70,  
                theme: 'grid',                                  
            })  
            doc.save('download.pdf');  
        }  

          function printPage(){
            window.print();
          }

          function ExportToExcel(type, fn, dl) {
            var elt = document.getElementById('tableContent');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
            return dl ?
              XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
              XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
         }

          </script>
          <script type="text/javascript" src="/assets/exceljs/xlsx.full.min.js"></script>
      </head>
      <body>
        <div id="tableContent">
          ${printContents}
        </div>  
      </body>
    </html>
      ` );
      setTimeout(()=>{     
          popupWin.print()      
      }, 500);  

      popupWin.document.close();
  }

  exportToExcel(): void {
    // 1. دریافت جدول HTML
    const element = this.myTable.nativeElement;

    // 2. تبدیل جدول به یک ورک‌شیت اکسل
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // 3. ایجاد یک ورک‌بوک اکسل
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 4. ذخیره و دانلود فایل اکسل
    XLSX.writeFile(wb, 'table-data.xlsx');
  }

  
  closeModal() {
    this.dialogRef.close();
  }



  footerColumnsTotal: any[] = [];
  // onSearchReport(model: ReportSearchDto) {
  //   this.splashScreenService.show();
   
  //   this.crudService.postDataUrl(Globals.UrlTreasuryReport, "reportBranchTrnCount", model).subscribe(res => {
  //     this.splashScreenService.hide();
  //     let tempDatasource: any[] = [];
  //     let zoneTitles = (res as any[]).map(item => item.zoneTitle);

  //     (res as any[]).forEach(item => {
  //       // فقط آیتم‌های موردنظر را به tempDatasource اضافه می‌کنیم.
  //       if (zoneTitles.includes(item.zoneTitle)) {
  //           tempDatasource.push(item);
  //       }
  //     });
    
  //     tempDatasource.sort((a, b) => {
  //       return zoneTitles.indexOf(a.zoneTitle) - zoneTitles.indexOf(b.zoneTitle);
  //     });
  //     this.datasource = tempDatasource;
 

  //     this.footerColumnsTotal = [{
  //       colSpan: 4,
  //       title: ""
  //     },
  //     {
  //       colSpan: 2,
  //       title:this.translate.instant('amount')+ this.currencyNumber.transform(this.calculateSum(this.datasource.filter(f=>f.currencyFromId==1), "amount")) + " Afg"
  //     },
  //     {
  //       colSpan: 2,
  //       title:this.translate.instant('amount')+ this.currencyNumber.transform(this.calculateSum(this.datasource.filter(f=>f.currencyFromId==3), "amount")) + " Usd"
  //     },      
  //     {
  //       colSpan: 2,
  //       title:this.translate.instant('commission')+ this.currencyNumber.transform(this.calculateSum(this.datasource.filter(f=>f.commesstionCurrencyId==1), "commession")) + " Afg"
  //     },
  //     {
  //       colSpan: 2,
  //       title:this.translate.instant('commission')+ this.currencyNumber.transform(this.calculateSum(this.datasource.filter(f=>f.commesstionCurrencyId==3), "commession")) + " Usd"
  //     },
  //     {
  //       colSpan: 2,
  //       title:this.translate.instant('payable')+ this.currencyNumber.transform(this.calculateSum(this.datasource.filter(f=>f.currencyToId==1), "paidable")) + " Afg"
  //     },
  //     {
  //       colSpan: 2,
  //       title: this.translate.instant('payable')+ this.currencyNumber.transform(this.calculateSum(this.datasource.filter(f=>f.currencyToId==3), "paidable")) + " Usd"
  //     },      
  //     {
  //       colSpan: this.datasource.length - 16,
  //       title: ''
  //     }];
  //   },
  //     error => {
  //       this.splashScreenService.hide();
  //       this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
  //     });
  // }
  isFirstItemInZone(index: number): boolean {
    if (index === 0) {
      return true; // اولین آیتم همیشه ورودی صحیح است
    }
    return this.datasource[index].designShoesTitle !== this.datasource[index - 1].designShoesTitle;
  }

  // تابعی برای به دست آوردن تعداد زون‌ها
  getZoneCount(title: string): number {
    return this.zoneCounts.get(title) || 1;
  }

calculateSum(array, property) {
  return array.reduce((acc, obj) => {
    const val = Number(obj?.[property]) || 0;
    return acc + val;
  }, 0);
}
}
