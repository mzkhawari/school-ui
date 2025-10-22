import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { ToastMessageService } from '../../../common-service/service/toast-message.service';


@Component({
  selector: 'app-shift-view-report-form',
  templateUrl: './shift-view-report-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShiftInfoViewReportFormComponent),
      multi: true
    },
  ]
})

export class ShiftInfoViewReportFormComponent implements OnInit {

  datasourceWiththrow: any[] = [];
  datasourceSave: any[] = [];

  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    public dialogRef: MatDialogRef<ShiftInfoViewReportFormComponent>,
    private router: Router,
    private accessKeywordService: AccessKeywordService,
    private toastMessageService: ToastMessageService) {
  }

  returnUrlAddress = '';
  ngOnInit() {
    this.returnUrlAddress = '';
    this.getItem();
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
      dataField: "transferCashTypeTitle",
      alignment: "center",
      caption:this.translate.instant('transaction-type'),
    },
    {
      dataField: "amount",
      alignment: "center",
      caption:this.translate.instant('sum'),
    },
    {
      dataField: "currencyForm.title",
      alignment: "center",
      caption:this.translate.instant('money'),
    },
    {
      dataField: "benefitRate",
      alignment: "center",
      caption:this.translate.instant('amount-of-benefit'),
    },
    {
      dataField: "commession",
      alignment: "center",
      caption:this.translate.instant('commission'),
    },
    {
      dataField: "countTrn",
      alignment: "center",
      caption:this.translate.instant('number-of-transactions2'),
    }];

  private getItem() {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlTransaction, "getTransactionShiftInfo").subscribe(res => {
      this.splashScreenService.hide();
      this.datasourceWiththrow = res.dataWithThrow;
      this.datasourceSave = res.dataSave;
    },
      error => {
        this.splashScreenService.hide();
      });
  }



}
