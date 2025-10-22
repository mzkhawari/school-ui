import { Component, Input, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { MatDialog } from '@angular/material/dialog';
import { ShiftBalanceViewReportComponent } from './shift-balance-view-report/shift-balance-view-report.component';
import { ShiftInfoDto } from 'app/student-module/models/shift-info.dto';

@Component({
  selector: 'app-shift-info',
  templateUrl: './shift-info.component.html',
})
export class ShiftInfoComponent implements OnInit {

  @Input()
  branchId: number = 0;

  datasource: ShiftInfoDto[] = [];
  model: ShiftInfoDto;
  accessItem: AccessItemDto;
  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private router: Router,
    private accessKeywordService: AccessKeywordService,
    private modalService: MatDialog,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.model = new ShiftInfoDto(0);
    this.baseUrlApi = Globals.UrlShiftInfo;
  }

  actions: ActionTypes = new ActionTypes({}, {}, {}, { isShow: true, icon: 'feather-sliders btn-detail', title:this.translate.instant('view-shift-report')}, 
                                                      { isShow: true, icon: 'feather-check btn-detail2', title:this.translate.instant('branch-manager-approval')},
                                                     { isShow: true, icon: 'feather-printer btn-print', title:this.translate.instant('show-shift-details')}, {});
  columns = [
    {
      caption: this.translate.instant('operation'),
      width: 150,
      cellTemplate: 'actionCellTemplate',
      fixed: "true",
      fixedPosition: "right",
    },
    {
      dataField: "id",
      alignment: "right",
      caption: " Identity ",
      sortOrder: "desc",
      width: 80,
      visible: false
    },
    {
      dataField: "description",
      alignment: "center",
      caption:this.translate.instant('shift'),
    },
    {
      dataField: "branchTitle",
      alignment: "center",
      caption: this.translate.instant('branch2'),
    },
    {
      dataField: "userFullName",
      alignment: "center",
      caption: this.translate.instant('user2'),
    },
    {
      dataField: "openShiftFa",
      alignment: "center",
      caption:this.translate.instant('start-date'),
    },
    {
      dataField: "closeShiftFa",
      alignment: "center",
      caption: this.translate.instant('end-of-shift'),
    },
    {
      dataField: "isConfirm",
      alignment: "center",
      caption: this.translate.instant('confirmation'),
    },
    {
      dataField: "confirmDateFa",
      alignment: "center",
      caption: this.translate.instant('shift-confirmation'),
    }];



  OnDetail(dataModel: ShiftInfoDto) {
    if (dataModel !== undefined && dataModel !== null) {
      this.router.navigateByUrl(`/shift/shift-info-view/${dataModel.id}`);
    }
  }

  OnShiftConfirm(dataModel: ShiftInfoDto) {
    this.splashScreenService.show();
    this.crudService.getDataUrlById(Globals.UrlShiftInfo, "confirmShift", dataModel.id).subscribe(res => {
      this.splashScreenService.hide();
      if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Server Error ", "SuccessFully is Confirmed");
      }
    },
      error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);

      })
  }

  OnPrint(dataModel: ShiftInfoDto) {
    if (dataModel !== undefined && dataModel !== null) {
      this.router.navigateByUrl(`/shift/shift-info-print/${dataModel.id}`);
    }
    //const activeModal = this.modalService.open(ShiftBalanceViewPrintComponent);
    //activeModal.componentInstance.modelId = dataModel.id;
  }


  OnShiftReport($event: ShiftInfoDto) {
    const activeModal = this.modalService.open(ShiftBalanceViewReportComponent);
    activeModal.componentInstance.modelId = $event.id;
    activeModal.afterClosed().subscribe(res => {
      //this.get();
    });
  }

  listTitle: string = ''
  isAccessToAllShift: boolean = false;
  ngOnInit() {
    this.listTitle = this.translate.instant('user-work-shift-list')

    if (this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Shift_List)) {
      if (this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Shift_List_All, false)) {
        this.isAccessToAllShift = true;
      } else {
        this.isAccessToAllShift = false;
      }
    }
  }

  get(data: any) {

    data.accessToAllShift = this.isAccessToAllShift;
    this.splashScreenService.show();
    this.crudService.postDataUrl(Globals.UrlShiftInfo, "searchOnShift", data).subscribe(res => {
      this.splashScreenService.hide();
      this.datasource = res;
    },
      error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
      });
  }

  // get() {
  //   this.splashScreenService.show();
  //   this.crudService.getInclude(this.baseUrlApi).subscribe(res => {
  //     this.splashScreenService.hide();
  //     this.datasource = res;
  //   },
  //     error => {
  //       this.splashScreenService.hide();
  //       this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
  //     });
  // }

}
