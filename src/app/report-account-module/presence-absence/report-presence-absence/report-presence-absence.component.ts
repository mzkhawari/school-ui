import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-presence-absence',
  templateUrl: './report-presence-absence.component.html',
  styleUrls: ['./report-presence-absence.component.css']
})
export class ReportPresenceAbsenceComponent implements OnInit {

  @ViewChild('myTable', { static: false }) myTable!: ElementRef;

  @Input() dataToPapOp: any[] = [];
  datasource: any[] = [];
  days: any[] = [];

  constructor(public dialogRef: MatDialogRef<ReportPresenceAbsenceComponent>) {}

  ngOnInit() {
    this.datasource = this.dataToPapOp;

    if (this.datasource.length > 0) {
      this.days = this.datasource[0].day.map(d => d.title);
    }
  }

  Print() {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin!.document.open();
    popupWin!.document.write(`
    <!doctype html>
    <html dir="rtl">
    <head>
      <title>پرینت</title>
      <style>
        body {
          font-family: "Tahoma", "IranSans", sans-serif;
          margin: 16px;
          direction: rtl;
          background-color: #fff;
          color: #000;
        }

        @media print {
  th, td {
    font-size: 9px !important;
  }

  th.rotate > div, 
  th span {
    font-size: 8px !important;
  }
}
  
        table {
          width: 100%;
          border-collapse: collapse !important;
          border: 2px solid #000 !important;
        }
  
        th, td {
          border: 1px solid #000 !important;
          padding: 6px 4px;
          text-align: center;
          vertical-align: middle;
        }
  
        thead th {
          background-color: #e0e0e0 !important;
          font-weight: bold;
        }
  
        tbody tr:nth-child(even) {
          background-color: #f8f8f8 !important;
        }
  
        tfoot td {
          background-color: #eaeaea !important;
          font-weight: bold;
        }
  
        /* 👇 تضمین نمایش رنگ‌ها و خطوط در preview پاپ‌آپ */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
  
        /* 👇 برای مرورگرهای قدیمی‌تر */
        table, th, td {
          border-style: solid !important;
          border-width: 1px !important;
          border-color: black !important;
        }

        .present {
  color: green;
  font-weight: bold;
}

.absent {
  color: red;
  font-weight: bold;
}

.late {
  color: orange;  /* رنگ تاخیر */
  font-weight: bold;
}

  
        /* ✅ تضمین اینکه قبل از پرینت هم خطوط دیده بشن */
        html, body {
          zoom: 1;
          transform: scale(1);
        }
      </style>
    </head>
    <body>
      <div id="tableContent">
        ${printContents}
      </div>
    </body>
    </html>
    `);
  
    popupWin!.document.close();
  
    // کمی تأخیر برای بارگذاری کامل CSS قبل از چاپ
    setTimeout(() => {
      popupWin!.focus();
      popupWin!.print();
    }, 700);
  }
  
  

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.myTable.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'PresenceAbsence.xlsx');
  }

  closeModal() {
    this.dialogRef.close();
  }
}
