import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { Router } from '@angular/router';
import { BranchDto } from '../models/branch.dto';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
})
export class BranchComponent implements OnInit {

  datasource: BranchDto[] = [];
  model: BranchDto;
  accessItem: AccessItemDto;
  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private router: Router,
    private accessKeywordService: AccessKeywordService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.model = new BranchDto(0);
    this.baseUrlApi = Globals.UrlBranch;
  }

  actions: ActionTypes = new ActionTypes({}, { isShow: true, icon: 'feather-edit btn-edit', title:this.translate.instant('edit')},
                                             { isShow: true, icon: 'feather-trash btn-delete', title:this.translate.instant('delete')},
                                             { isShow: true, icon: 'feather-users btn-detail', title: this.translate.instant('branch-users')}, { }, {}, {});
  columns = [
    {
      caption: this.translate.instant('operation'),
      width: 200,
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
      dataField: "title",
      alignment: "center",
      caption: this.translate.instant('title'),
    },
    {
      dataField: "user.fullName",
      alignment: "center",
      caption: this.translate.instant('branch-manager'),
    },
    {
      dataField: "phone",
      alignment: "center",
      caption: this.translate.instant('تلفن'),
    },
    // {
    //   dataField: "ceilingAmountTrn",
    //   alignment: "center",
    //   caption:this.translate.instant('daily-transaction-limit'),
    // },
    // {
    //   dataField: "province.title",
    //   alignment: "center",
    //   caption: this.translate.instant('province'),
    // },

    // {
    //   dataField: "city.title",
    //   alignment: "center",
    //   caption: this.translate.instant('county'),
    // },

    {
      dataField: "isActive",
      alignment: "center",
      caption: this.translate.instant('active/inactive'),
      width: 120,
    }];



  openDialogForm(dataModel?: BranchDto) {
    if (dataModel !== undefined && dataModel !== null) {
      this.router.navigateByUrl(`/branch/branch/${dataModel.id}`);
    } else {
      this.router.navigateByUrl('/branch/branch/add');
    }
  }
  listTitle: string = ''
  ngOnInit() {
    this.listTitle = this.translate.instant('list-of-branches2')
    this.get();
  }

  onDeleteConfirm(id: number) {
    if (!this.accessKeywordService.checkAccessDelete(AccessKeyword.ACCKEY_Branch)) {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('message2'),this.translate.instant('you-do-not-have-access-to-delete'))
      return;
    }



    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.splashScreenService.show();

        this.crudService.deleteById(this.baseUrlApi, id).subscribe(res => {
          if (res) {
            this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success Message ", "Deleted is Successfully!")
            this.get();
          }
          else {
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Error Message ", "Error operation")
          }
        },
          error => {
            this.splashScreenService.hide();
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
          }, () => {
            this.splashScreenService.hide();
            this.get();
          });
      }
    });
  }

  OnUpdate(item: BranchDto) {
    this.openDialogForm(item);
    // if (this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Branch)) {
    // } else {
    //   this.toastMessageService.showToast(NbToastStatus.DANGER, "خطای دسترسی ", "شما به ویرایش رکورد دسترسی ندارید.");
    // }
  }


  onDetail(item: BranchDto) {

    this.router.navigateByUrl(`branch/branch-user/${item.id}`);

  }

  onDetail2(item: BranchDto) {
     
    if(item.financeCashId !== null && item.financeCashId !== undefined && item.financeCashId ==0 ){
      this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ",this.translate.instant('cache-account-has-already-been-created'));
      return ;
    }

    this.crudService.postDataUrl(Globals.UrlBranch, "financeAccount", item).subscribe(res => {
      this.splashScreenService.hide();
      if(res ==true){
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", this.translate.instant('cache-account-created-successfully'));
      }
      this.get();
    },
    error => {
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
    });

  }


  get() {
    if (!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Branch)) {
      return;
    }
    this.splashScreenService.show();
    this.crudService.getInclude(this.baseUrlApi).subscribe(res => {
      this.splashScreenService.hide();
      this.datasource = res;
    },
      error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
      });
  }

}
