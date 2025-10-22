import { Component, Input, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { MatDialog } from '@angular/material/dialog';
import Globals from 'app/common-service/globals';
import { AccessKeyDto } from 'app/common-service/models/web-site/access-key.dto';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { TranslateService } from '@ngx-translate/core';
import { AccessKeyProvinceDto } from 'app/common-service/models/web-site/access-key-province.dto';
import { AccessKeyProvinceFormComponent } from './accesskey-province-form/accesskey-province-form.component';

@Component({
  selector: 'accesskey-province',
  templateUrl: './accesskey-province.component.html',
})
export class AccessKeyProvinceComponent implements OnInit {

  userList: UserDto[] = [];
  datasource: AccessKeyProvinceDto[] = [];
  UserId: number = 0;

  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private modalService: MatDialog,
    private accessKeywordService: AccessKeywordService,
    private toastMessageService: ToastMessageService) {
    this.baseUrlApi = Globals.UrlAccessKeyProvince;
    this.captionField.push({ CaptionTitle: this.translate.instant('form.title'), DataValue: "Title" });
  }

  columns = [
    {
      caption: this.translate.instant('operation'),
      width: 150,
      cellTemplate: 'editCellTemplate',
      fixed: "true",
      fixedPosition: "right",
    },
    {
      dataField: "id",
      alignment: "right",
      caption: this.translate.instant('branch'),
      sortOrder: "desc",
      width: 80,
      visible: false,
    },
    {
      dataField: "province.title",
      alignment: "center",
      caption: "ولایت" //this.translate.instant('form.province'),
    },
    {
      dataField: "userRole.title",
      alignment: "center",
      caption: this.translate.instant('role2'),
    },
    {
      dataField: "user.fullName",
      alignment: "center",
      caption: this.translate.instant('user3'),
    }];


  openDialogForm(modelAccess?: AccessKeyProvinceDto) {


    const activeModal = this.modalService.open(AccessKeyProvinceFormComponent);
    activeModal.componentInstance.model = Object.assign({}, modelAccess);
    activeModal.afterClosed().subscribe(res => {
      this.get();
    });
  }


  accesskeys: AccessKeyDto;
  captionField: any[] = [];
  titlelist: string = ''
  titlelistFull: string = ''
  total: string = ''
  ngOnInit() {
    this.titlelist = this.translate.instant('province-access-list');
    this.total = this.translate.instant('page-title.total');

    this.get();
  }

  onDeleteConfirm(model: AccessKeyProvinceDto) {


    let id: number = model.id;
    if (model != undefined) {
      if (model.userId != null && model.userId > 0 && model.userId <= 2) {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('warning'),this.translate.instant('you-cannot-remove-this-access'))
        return;
      }
    }
    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.crudService.deleteById(this.baseUrlApi, id).subscribe(res => {
          if (res) {
            this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('success-message'), this.translate.instant('deleted-is-successfully'))
          }
          else {
            this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'), this.translate.instant('encountered-an-error'))
          }
        },
          error => {
            this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
          }, () => {
            this.get();
          });

      }
    });
  }

  OnUpdate(item: AccessKeyProvinceDto) {
    if (!this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_AccessProvince)) {
      return;
    }
    if (item.userId == 1 || item.userRoleId == 1) {
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('warning'),this.translate.instant('you-cannot-change-the-access-of-the-super-user'));
      return;
    }
    this.openDialogForm(item);
  }

  OnAdd() {
    if (!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_AccessProvince)) {
      return;
    }
    this.openDialogForm();
  }

  selectedAccessIds: number[] = [];
  selectItem(event) {
    console.log(event);
    this.selectedAccessIds = event.map(({ Id }) => Id);
  }


  filterUser($event) {
    let value = $event.value;

  }


  private get() {

    if (!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_AccessProvince)) {
      return;
    }

    this.crudService.getInclude(Globals.UrlAccessKeyProvince).subscribe(res => {
      const data = res;//   JSON.parse(res);
      this.datasource = data;
      this.titlelistFull = `${this.titlelist}`;//  (${this.total}:${res.length})`

    },
      error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
      },
      () => {
      });
  }

  private getUserRoles(): any {
    return this.crudService.get(Globals.UrlUserRole);
  }
  private getUserList(): any {
    return this.crudService.get(Globals.UrlUser);
  }

  OnSaveFull(model: AccessKeyProvinceDto) {

    this.crudService.postDataUrl(this.baseUrlApi, "AccessToAll", model).subscribe(res => {
      //window.console.log(model);
      if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('success-message'),this.translate.instant('added-successfully'))
        this.get();
      } else {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'), this.translate.instant('unknown-error'))
      }
    }, error => {
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    }, () => {
      this.get();
    });
  }


}
