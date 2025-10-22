import { Component, Input, OnInit, ViewEncapsulation, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';
// import { saveAs } from 'file-saver';

// // polyfills required by exceljs
// require('core-js/modules/es.promise');
// require('core-js/modules/es.string.includes');
// require('core-js/modules/es.object.assign');
// require('core-js/modules/es.object.keys');
// require('core-js/modules/es.symbol');
// require('core-js/modules/es.symbol.async-iterator');
// require('regenerator-runtime/runtime');
// const ExcelJS = require('exceljs/dist/es5');


@Component({
    selector: 'dev-grid-print',
    templateUrl: './dev-grid-print.component.html',
    styleUrls:[ './dev-grid-print.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DevGridPrintComponent implements OnInit  {
    model : any;

    
    @Input() dataSourceFooter : any;
    @Input() columns : any[] =[];
    @Input() dataHeaderReport : any;
    @Input() dataFooterReport : any;
    @Input() dataFooterReport2 : any;
    @Input() isShowPrintButton : boolean = true;
    @Input() title : string = "";
    @Input() isUseGroup : boolean = false;
    @Input() isExporting: boolean = false;
    @Input() atuoPrint: boolean = false;

    @Input() dataSourceSub : any[]=[];

    _dataSource: any[]=[];
    get dataSource(): any[] {
      return this._dataSource;
    }
    @Input() set dataSource(value: any[]) {
        this._dataSource = value;

        if(this.dataSource.length >0 && this.atuoPrint){
          setTimeout(()=>{
            this.Print(1)
          }, 5000)
        }  
    }


    columsCount:number =0;
    @Input()
    isShowCustomer :boolean = false;
    @Input()
    personModel:any;

    elRef: ElementRef; 
    constructor(elementRef: ElementRef, public translate: TranslateService) {         
      this.elRef = elementRef; 
    }

    @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;
    exportSelectedData() {
       this.dataGrid.instance.exportToExcel(false);
       //this.exportTableToExcel('table-data', 'reportExcel');
    };

    getHtmlContent() {
      return this.elRef.nativeElement.innerHTML;
    }

    ngOnInit(){
      this.columsCount =  this.columns.length;
      if (this.atuoPrint==true) {
        this.isShowPrintButton=false
      }
     
    }

    
  
    
    @ViewChild('topHeader') topHeader :ElementRef;
    OnRowPrepared(e:any) {  
      if (e.rowType == 'header'){  
        debugger;
        let topHeader = this.topHeader;
          //e.rowElement.parentNode.insertBefore(topHeader, e.rowElement);  
      }
  }  

    isPrintMode:boolean= false;
    modelFooter:any={
      name:'',
      name1:'',
      branch:'',
      branch1:'',
      date:'',
      date1:'',
      duty:'',
      duty1:''
    };

    CheckValues(value:any):string{
      if(value!==1 && value !==0){
        if(value===true){
           return "بلی" 
        }
        if(value===false){
          return "خیر"
        }
      }
      if(value=='00:00'){
        return '';
      }
      return value;
    }


    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>  
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js"></script>


    Print(itemStep: number) {   //itemStep  1: print , 2 export excel , 3 : export excel
      setTimeout(() => { // Wait Until Replace Input With spann
        this.printDialog(itemStep);
      }, 5000);
    }

    printDialog(itemStep:number ){   //itemStep  1: print , 2 export excel , 3 : export excel
      let htmlContent = this.getHtmlContent();
      
      var myWindow = window.open("", "_blank", "width='100%',height=542");
      if(myWindow ==undefined || myWindow.document == undefined){
        return;
      }
 
       myWindow.document.write(`
       <!doctype html>
        <html>
        <head>      
            <title>پرینت راپور</title>            
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
            ${htmlContent}
          </div>  
        </body>
      </html>
        ` );
        if(itemStep!==3){
          setTimeout(()=>{     
            if(itemStep==1){
              myWindow.print();
              myWindow.close();
            }else if(itemStep==2){
              myWindow.document.getElementById("btnExcelreport").click();
              myWindow.close();
            }else if(itemStep==3){
              
            }else{
              //myWindow.open();
            }       
          }, 500);      
        }else{
          //this.exportTableToExcel('table-data','reportExcel')
          this.exportExcel = 1;
          myWindow.close();
        }
    }
    exportExcel :any=0;


    // exportTableToExcel(tableId, fileName) {
    //   // Create a new workbook and worksheet
    //   const workbook = new ExcelJS.Workbook();
    //   const worksheet = workbook.addWorksheet('Sheet 1');

    //   // Get the table element
    //   const table = document.getElementById(tableId);

    //   // Add table headers
    //   const headers = table.querySelectorAll('thead tr th');
    //   const headerRow = [];
    //   headers.forEach((header) => {
    //     headerRow.push(header.textContent);
    //   });
    //   worksheet.addRow(headerRow);

    //   // Add table rows
    //   const rows = table.querySelectorAll('tbody tr');
    //   rows.forEach((row) => {
    //     const rowData = [];
    //     row.querySelectorAll('td').forEach((cell) => {
    //       rowData.push(cell.textContent);
    //     });
    //     worksheet.addRow(rowData);
    //   });

    //   // Style headers
    //   const headerRowStyle = worksheet.getRow(1);
    //   headerRowStyle.eachCell((cell) => {
    //     cell.font = { bold: true };
    //     cell.alignment = { vertical: 'middle', horizontal: 'center' };
    //     cell.fill = {
    //       type: 'pattern',
    //       pattern: 'solid',
    //       fgColor: { argb: 'FFD3D3D3' }, // Light gray
    //     };
    //   });

    //   // Auto-fit column widths
    //   worksheet.columns.forEach((column) => {
    //     let maxLength = 0;
    //     column.eachCell({ includeEmpty: true }, (cell) => {
    //       const cellValue = cell.value ? cell.value.toString() : '';
    //       maxLength = Math.max(maxLength, cellValue.length);
    //     });
    //     column.width = maxLength + 2; // Add padding
    //   });

    //   // Save the file
    //   workbook.xlsx.writeBuffer().then((buffer) => {
    //     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
    //   });
    // }
}


