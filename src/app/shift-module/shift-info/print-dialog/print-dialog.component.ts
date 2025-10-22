import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';


@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => ShiftBalanceViewPrintComponent),
  //     multi: true
  //   },
  // ]
})

export class PrintDialogComponent implements OnInit {

  @Input()
  modelId: number = 0;

  datasource: any[] = [];
  datasourceCurrent: any[] = [];
  datasourcePerv: any[] = [];


  model: any;

  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private activateRoute: ActivatedRoute,
    public splashScreenService: LoadingSplashScreenService,
    public dialogRef: MatDialogRef<PrintDialogComponent>) {
  }

  returnUrlAddress = '';
  currentSelectedShiftId: number = 0;
  ngOnInit() {
    this.returnUrlAddress = '';

    // let id = this.activateRoute.snapshot.params['id'];
    // if (id !== undefined && id > 0) {
    //   this.currentSelectedShiftId = id;
    //   this.getItem(id);
    // } else {
    //   this.getItem(this.modelId);
    // }
  }

  printReport() {
    //document.getElementsByClassName('print-section').print();
    window.print();
  }

  columns = [
    {
      dataField: "id",
      alignment: "right",
      caption: " Identity ",
      sortOrder: "desc",
      width: 80,
      visible: false
    },
    {
      dataField: "amountDebitHawala",
      alignment: "center",
      caption:this.translate.instant('amount-recived-for-hawala-to-sent'),
    },
    {
      dataField: "amountDebitExchange",
      alignment: "center",
      caption:this.translate.instant('amount-recived-for-currency-exchange'),
    },
    {
      dataField: "commession",
      alignment: "center",
      caption:this.translate.instant('commession-recived-for-hawala-to-sent'),
    },
    {
      dataField: "amountCreditHawala",
      alignment: "center",
      caption:this.translate.instant('amount-paid-for-hawala-recived'),
    },
    {
      dataField: "amountCreditExchange",
      alignment: "center",
      caption:this.translate.instant('amount-paid-for-currency-exchange'),
    },

    {
      dataField: "currency.title",
      alignment: "center",
      caption:this.translate.instant('currency3'),
    }];

  columnsBalanceCurrent = [
    {
      dataField: "id",
      alignment: "right",
      caption: " Identity ",
      sortOrder: "desc",
      width: 80,
      visible: false
    },
    {
      dataField: "amount",
      alignment: "center",
      caption:this.translate.instant('amount'),
    },
    {
      dataField: "currencyTitle",
      alignment: "center",
      caption:this.translate.instant('unit'),
    }];

  timeStart: string = "";
  timeEnd: string = "";
  openShift: string = "";
  private getItem(id: number) {
    this.splashScreenService.show();
    this.crudService.getDataUrlById(Globals.UrlShiftInfo, "reportShiftBalance", id).subscribe(res => {
      this.splashScreenService.hide();
      this.datasource = res.balanceCurrentDetail;
      this.datasourceCurrent = res.balanceCurrent;
      this.datasourcePerv = res.balancePerv;
      this.model = res.shiftInfo;
      this.openShift = res.dateOpen;
      this.timeStart = res.timeStart;
      this.timeEnd = res.timeEnd;
    },

      error => {
        this.splashScreenService.hide();
      });
  }
}
