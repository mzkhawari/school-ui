import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';

import { UserFormComponent } from './user-form/user-form.component';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { MatDialog } from '@angular/material/dialog';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionTypes } from '../../../common-module/common-component-grid-material/models/app-grid-action-type';
import { UserTypeFormComponent } from './user-type-form/user-type-form/user-type-form.component';


@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent implements OnInit {

  datasource: UserDto[] = [];
  model: UserDto;
  accessItem: AccessItemDto;
  private roles: UserRoleDto[] = [];
  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private modalService: MatDialog,
    private accessKeywordService: AccessKeywordService,
    private toastMessageService: ToastMessageService) {
    this.model = new UserDto(0);
    this.baseUrlApi = Globals.UrlUser;
  }
  actions: ActionTypes = new ActionTypes( {},{ isShow: true, icon: 'feather-edit btn-edit', title:this.translate.instant('edit')},
                                             { isShow: true, icon: 'feather-trash btn-delete', title:this.translate.instant('delete')},
                                             { isShow: true, icon: 'feather-sliders btn-detail', title:this.translate.instant('change-password')}, {}, {});
  columns = [
    {
      dataField: "picUrlAvatar",
      caption: this.translate.instant('picture'),
      cellTemplate: 'photoCellTemplate',
      width: 100,
    },
    {
      caption: this.translate.instant('operation'),
      width: 150,
      cellTemplate: 'actionCellTemplate',
    },
    {
      dataField: "id",
      alignment: "right",
      caption:this.translate.instant('id'),
      sortOrder: "desc",
      width: 80,
      visible: false,
    },
    {
      dataField: "firstName",
      alignment: "center",
      caption: this.translate.instant('name'),
    },
    {
      dataField: "lastName",
      alignment: "center",
      caption: this.translate.instant('last-name'),
    },
    {
      dataField: "userRole.title",
      alignment: "center",
      caption: this.translate.instant('role2'),
    },    
    {
      dataField: "userName",
      alignment: "center",
      caption: this.translate.instant('username3'),
    },
    {
      dataField: "isActive",
      alignment: "center",
      caption: this.translate.instant('active/inactive'),
      width: 120,
    }];


  openDialogForm(dataModel?: UserDto) {

    if (!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Branch_User) && dataModel == undefined) {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('message2'),this.translate.instant('you-do-not-have-access-to-add'));
      return;
    }

    const activeModal = this.modalService.open(UserFormComponent);
    activeModal.componentInstance.model = Object.assign({}, dataModel);
    activeModal.componentInstance.OnSelectOptionList = this.getSelectOptions();
    activeModal.afterClosed().subscribe(() => {
      this.get();
    })
  }


  openUserTypes(item:any) {

    const activeModal = this.modalService.open(UserTypeFormComponent);
    activeModal.componentInstance.userId = item.id;
    activeModal.afterClosed().subscribe(() => {
      this.get();
    })
  }

  openResetPass(dataModel: UserDto) {
    this.toastMessageService.configFormPassword.patchValue({
      title:`${this.translate.instant('change-password4')}`,
      message: `${this.translate.instant('are-you-sure-you-want-to-change-your-password')} <span class="font-medium"></span>` ,
    });
    
    this.toastMessageService.confirmRestPassword().subscribe((result) => {


    if (result === 'confirmed') {
      this.crudService.getDataUrl(Globals.UrlUser, `resetPassword/${dataModel.id}`).subscribe(res => {
        if (res) {
         
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('success-message'), this.translate.instant('password-sending-message'));
        } else {
      
          this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'), this.translate.instant('unknown-error'));
        }
      }, error => {
        
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      },
        () => {
          this.model = new UserDto();
        });
      }
    })

  }
  
  private getSelectOptions(): any {
    return this.crudService.getDataUrl(Globals.UrlUser, "GetSelectOptions");
  }
  titlelist: string = ''
  ngOnInit() {
    this.titlelist = this.translate.instant('user-list');
    this.get();
  }

  onDeleteConfirm(id: number) {
    if (!this.accessKeywordService.checkAccessDelete(AccessKeyword.ACCKEY_Branch_User)) {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('message2'),this.translate.instant('you-do-not-have-access-to-add'))
      return;
    }


    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {

        this.crudService.deleteById(this.baseUrlApi, id).subscribe(res => {
          if (res) {
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('deleted-is-successfully'))
            this.get();
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

  OnUpdate(item: UserDto) {
    this.openDialogForm(item);
  }

  get() {
    if (!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Branch_User)) {
      return;
    }
    this.crudService.getDataUrl(this.baseUrlApi, `GetInclude`).subscribe(res => {
      this.datasource = res;
    },
    error => {
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    });
  }
}
