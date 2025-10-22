import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';


@Component({
  selector: 'app-shift-balance-view-report',
  templateUrl: './shift-balance-view-report.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShiftBalanceViewReportComponent),
      multi: true
    },
  ]
})

export class ShiftBalanceViewReportComponent implements OnInit {

  @Input()
  modelId: number = 0;

  datasource: any[] = [];
  datasourceCurrent: any[] = [];
  datasourcePerv: any[] = [];


  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private toastMessageService: ToastMessageService,
    public splashScreenService: LoadingSplashScreenService,
    public dialogRef: MatDialogRef<ShiftBalanceViewReportComponent>) {
  }

  returnUrlAddress = '';
  ngOnInit() {
    this.returnUrlAddress = '';
    this.getItem();
  }

  closeShiftTreasury() {
    let model = {
      description: 'Close & Confirm',
      id: this.modelId,
      shiftReportList: this.datasource,
    };
    this.splashScreenService.show();
    this.crudService.postDataUrl(Globals.UrlShiftInfo, "closeShiftInfoByList", model).subscribe(res => {
      if (res) {
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

  private getItem() {
    this.splashScreenService.show();
    this.crudService.getDataUrlById(Globals.UrlShiftInfo, "reportShiftBalance", this.modelId).subscribe(res => {
      this.splashScreenService.hide();
      this.datasource = res.balanceCurrentDetail;
      this.datasourceCurrent = res.balanceCurrent;
      this.datasourcePerv = res.balancePerv;
    },

      error => {
        this.splashScreenService.hide();
      });
  }
}
