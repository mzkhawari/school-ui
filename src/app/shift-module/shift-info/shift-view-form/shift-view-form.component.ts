import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { ShiftInfoDto } from 'app/student-module/models/shift-info.dto';


@Component({
  selector: 'app-shift-view-form',
  templateUrl: './shift-view-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShiftInfoViewFormComponent),
      multi: true
    },
  ]
})

export class ShiftInfoViewFormComponent implements OnInit {

  model: ShiftInfoDto;
  datasourceWiththrow: any[] = [];
  datasourceSave: any[] = [];

  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private activateRoute: ActivatedRoute,
    public splashScreenService: LoadingSplashScreenService,
    public dialogRef: MatDialogRef<ShiftInfoViewFormComponent>,
    private toastMessageService: ToastMessageService) {
    this.model = new ShiftInfoDto();
  }

  returnUrlAddress = '';
  currentSelectedShiftId = 0;
  ngOnInit() {
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
      caption: this.translate.instant('money'),
    },
    {
      dataField: "benefitRate",
      alignment: "center",
      caption: this.translate.instant('amount-of-benefit'),
    },
    {
      dataField: "commession",
      alignment: "center",
      caption: this.translate.instant('commission'),
    },
    {
      dataField: "countTrn",
      alignment: "center",
      caption:this.translate.instant('number-of-transactions2'),
    }];


  datainfo: string = "";
  closeShiftTreasury() {
    let model = {
      description: this.datainfo,
      id: this.currentSelectedShiftId
    };
    this.splashScreenService.show();
    this.crudService.postDataUrl(Globals.UrlShiftInfo, "closeShiftInfo", model).subscribe(res => {
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



  private getItem(id: number) {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlTransaction, `getTransactionShiftInfo/${id}`).subscribe(res => {
      this.splashScreenService.hide();
      this.model = res;
      this.datasourceWiththrow = res.dataWithThrow;
      this.datasourceSave = res.dataSave;
    },
      error => {
        this.splashScreenService.hide();
      });
  }
}
