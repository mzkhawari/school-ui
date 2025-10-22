import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';


@Component({
  selector: 'app-shift-balance-view-print',
  templateUrl: './shift-balance-view-print.component.html',
  styleUrls: ['./shift-balance-view-print.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => ShiftBalanceViewPrintComponent),
  //     multi: true
  //   },
  // ]
})

export class ShiftBalanceViewPrintComponent implements OnInit {

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
    public dialogRef: MatDialogRef<ShiftBalanceViewPrintComponent>) {
  }

  returnUrlAddress = '';
  currentSelectedShiftId: number = 0;
  isIgnore: boolean = true;
  ngOnInit() {
    this.returnUrlAddress = '';

    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      this.currentSelectedShiftId = id;
      this.getItem(id);
    } else {
      this.getItem(this.modelId);
    }
  }

  printReport() {
    this.isIgnore = false;
    setTimeout(() => {
      window.print();
      this.isIgnore = true;
    }, 500)
    //const activeModal = this.modalService.open(PrintDialogComponent);
    //activeModal.componentInstance.modelId = dataModel.id;
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
      format: {
        type: "fixedPoint",
        precision: 2
      },
    },
    {
      dataField: "amountDebitExchange",
      alignment: "center",
      caption:this.translate.instant('amount-recived-for-currency-exchange'),
      format: {
        type: "fixedPoint",
        precision: 2
      },
    },
    {
      dataField: "commession",
      alignment: "center",
      caption:this.translate.instant('commession-recived-for-hawala-to-sent'),
      format: {
        type: "fixedPoint",
        precision: 2
      },
    },
    {
      dataField: "amountCreditHawala",
      alignment: "center",
      caption:this.translate.instant('amount-paid-for-hawala-recived'),
      format: {
        type: "fixedPoint",
        precision: 2
      },
    },
    {
      dataField: "amountCreditExchange",
      alignment: "center",
      caption:this.translate.instant('amount-paid-for-currency-exchange'),
      format: {
        type: "fixedPoint",
        precision: 2
      },
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
      format: {
        type: "fixedPoint",
        precision: 2
      },
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
