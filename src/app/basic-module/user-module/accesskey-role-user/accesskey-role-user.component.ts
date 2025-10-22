import { Component, Input, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { AccessKeyRoleUserDto } from 'app/common-service/models/web-site/access-key-role-user.dto';
import { MatDialog } from '@angular/material/dialog';
import Globals from 'app/common-service/globals';
import { AccessKeyDto } from 'app/common-service/models/web-site/access-key.dto';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { TranslateService } from '@ngx-translate/core';
import { AccessKeyRoleInlineFormComponent } from './accesskey-role-inline-form/accesskey-role-inline-form.component';

@Component({
  selector: 'accesskey-role-user',
  templateUrl: './accesskey-role-user.component.html',
})
export class AccessKeyRoleUserComponent implements OnInit {

  userList: UserDto[] = [];
  datasource: AccessKeyRoleUserDto[] = [];
  UserId: number = 0;

  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private modalService: MatDialog,
    private accessKeywordService: AccessKeywordService,
    private toastMessageService: ToastMessageService) {
    this.baseUrlApi = Globals.UrlAccessKeyRoleUser;
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
      caption: this.translate.instant('form.id'),
      sortOrder: "desc",
      width: 80,
      visible: false,
    },
    {
      dataField: "accessKey.title",
      alignment: "center",
      caption: this.translate.instant('access-key'),
    },
    {
      dataField: "isShow",
      alignment: "center",
      caption: this.translate.instant('show'),
    },
    {
      dataField: "isAdd",
      alignment: "center",
      caption: this.translate.instant('add2'),
    },
    {
      dataField: "isEdit",
      alignment: "center",
      caption: this.translate.instant('edit'),
    },
    {
      dataField: "isDelete",
      alignment: "center",
      caption: this.translate.instant('delete'),
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



  openDialogForm(modelAccess?: AccessKeyRoleUserDto) {

    if (!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Access_Role_User) && modelAccess == undefined) {
      return;
    }
    const activeModal = this.modalService.open(AccessKeyRoleInlineFormComponent);
    activeModal.componentInstance.model = Object.assign({}, modelAccess);
    activeModal.componentInstance.OnRoleList = this.getUserRoles();
    activeModal.componentInstance.OnUserList = this.getUserList();
    activeModal.componentInstance.OnAccessKeyList = this.getAccessKeys();
    activeModal.componentInstance.OnSave.subscribe((receivedEntry) => {
      //this.OnSave(receivedEntry);
      activeModal.close();
      this.get();
    });

    activeModal.componentInstance.OnSaveFull.subscribe((receivedEntry) => {
      this.OnSaveFull(receivedEntry);
      activeModal.close();
    });

    activeModal.afterClosed().subscribe(res => {
      this.get();
    });
  }


  openDialogForm2(modelAccess?: AccessKeyRoleUserDto) {

    if (!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_AccessRoleUser) && modelAccess == undefined) {
      return;
    }
    const activeModal = this.modalService.open(AccessKeyRoleInlineFormComponent);
    activeModal.componentInstance.model = Object.assign({}, modelAccess);
    activeModal.componentInstance.OnRoleList = this.getUserRoles();
    activeModal.componentInstance.OnUserList = this.getUserList();
    activeModal.componentInstance.OnAccessKeyList = this.getAccessKeys();
    activeModal.componentInstance.OnSave.subscribe((receivedEntry) => {
      this.OnSave(receivedEntry);
      activeModal.close();
    });

    activeModal.componentInstance.OnSaveFull.subscribe((receivedEntry) => {
      this.OnSaveFull(receivedEntry);
      activeModal.close();
    });
  }


  accesskeys: AccessKeyDto;
  captionField: any[] = [];
  titlelist: string = ''
  titlelistFull: string = ''
  total: string = ''
  ngOnInit() {
    this.titlelist = this.translate.instant('access-list');
    this.total = this.translate.instant('page-title.total');

    this.getUser();
    this.get();
    this.getAccessKeys().subscribe(res => {
      const data = res;//   JSON.parse(res);
      this.accesskeys = res;
    },
      error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
      },
      () => {
      });
  }

  onDeleteConfirm(model: AccessKeyRoleUserDto) {


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
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('deleted-is-successfully'))
          }
          else {
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('encountered-an-error'))
          }
        },
          error => {
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
          }, () => {
            this.get();
          });

      }
    });
  }

  OnUpdate(item: AccessKeyRoleUserDto) {
    if (!this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_AccessRoleUser)) {
      return;
    }
    if (item.userId == 1 || item.userRoleId == 1) {
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('warning'),this.translate.instant('you-cannot-change-the-access-of-the-super-user'));
      return;
    }
    this.openDialogForm(item);
  }

  OnAdd() {
    if (!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_AccessRoleUser)) {
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
    if (!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_AccessRoleUser)) {
      return;
    }

    this.crudService.getInclude(Globals.UrlAccessKeyRoleUser).subscribe(res => {
      const data = res;//   JSON.parse(res);
      this.datasource = data;
      this.titlelistFull = `${this.titlelist}`

    },
      error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
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
  private getAccessKeys(): any {
    return this.crudService.get(Globals.UrlAccessKey);
  }
  private getUser(): any {
    return this.crudService.get(Globals.UrlUser).subscribe(res => {
      let value = res;
      this.userList = value.DataReport as UserDto[];
    });
  }

  OnSaveFull(model: AccessKeyRoleUserDto) {

    this.crudService.postDataUrl(this.baseUrlApi, "AccessToAll", model).subscribe(res => {
      //window.console.log(model);
      if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('success-message'),this.translate.instant('added-successfully'))
        this.get();
      } else {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))
      }
    }, error => {
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    }, () => {
      this.get();
    });
  }

  OnSave(model: AccessKeyRoleUserDto) {
    var resultModel = this.datasource.filter(f => f.accessKeyId == model.accessKeyId && f.userRoleId == model.userRoleId && f.userId == model.userId);
    if (resultModel != undefined && resultModel.length > 0) {
      model.id = resultModel[0].id;
    }
    var id = model.id;

    if (id == 0 || id == undefined) {
      this.crudService.postAdd(this.baseUrlApi, model).subscribe(res => {
        //window.console.log(model);
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))
          this.get();
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'),this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
      }, () => {
        this.get();
      });
    } else {
      this.crudService.putData(this.baseUrlApi, model, id).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('successfully-edited'))
          this.get();
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      }, () => {
        this.get();
      });

    }
  }
}
