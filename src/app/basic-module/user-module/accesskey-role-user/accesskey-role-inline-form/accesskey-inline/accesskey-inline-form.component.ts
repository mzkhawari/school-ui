import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccessKeyRoleUserDto } from 'app/common-service/models/web-site/access-key-role-user.dto';
import { AccessKeyDto } from 'app/common-service/models/web-site/access-key.dto';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { BaseCrudService } from '../../../../../common-service/service/base-crud.service';
import Globals from '../../../../../common-service/globals';

@Component({
  selector: 'app-accesskey-inline-form',
  templateUrl: './accesskey-inline-form.component.html',
})
export class AccessKeyInlineFormComponent implements OnInit {

  @Input()
  model: AccessKeyRoleUserDto;
  @Input()
  userRoleId: number;
  @Input()
  userId: number;
  @Output()
  OnRefresh: EventEmitter<AccessKeyRoleUserDto> = new EventEmitter();

  roles: UserRoleDto[] = [];
  users: UserDto[] = [];
  accessKeys: AccessKeyDto[] = [];
  isFullAccessButton: boolean = false;

  onRoleAccess: number = 0;
  onTypeAccess: number = 0;
  listAccessWebKeys = [];
  parentFiledId: string = "AccessKeyParentId";
  //private formField : FormControl;
  constructor(public translate: TranslateService,
    public dialogRef: MatDialogRef<AccessKeyInlineFormComponent>,
    private crudService: BaseCrudService,
    private base: FormBuilder, private toastMessageService: ToastMessageService) {
    this.model = new AccessKeyRoleUserDto(0);
  }

  addstring: string = ''
  editstring: string = ''
  ngOnInit() {
    this.addstring = this.translate.instant('adding-access');
    this.editstring = this.translate.instant('edit-access');

    if (this.model != undefined && this.model.id > 0) {
      this.isFullAccessButton = false;
    } else {
      this.isFullAccessButton = true;
    }

  }

  groupHeders: any[] = []
  getFilterData(id: number) {
    return this.listAccessWebKeys.filter((elem, index) => {
      return elem.AccessKeyParentId == id;
    });
  }

  onTypeAccessChange(item) {
    if (this.onTypeAccess == 0) {
      this.onRoleAccess = item.value
    } else {
      this.onRoleAccess = item.value
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  OnSubmitItem(event) {
  }


  OnSelectChange(item: any) {

    this.model.accessKeyId = item.value;
  }

  OnSaveAccess() {

    if (this.model.userId != undefined && this.model.userRoleId != undefined) {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-select-a-user-or-role'));
      return;
    }
  }


  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if (form.valid) {
      //this.OnSave(this.model);
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'), this.translate.instant('please-fill-in-the-form-values-​​correctly'))
    }
  }

  setChangeCheckBox(event) {
    if (!(this.userId == 0 || this.userId == undefined)) {
      this.model.userId = this.userId;
    }
    if (!(this.userRoleId == 0 || this.userRoleId == undefined)) {
      this.model.userRoleId = this.userRoleId;
    }

    this.OnSave(this.model);
  }

  OnSave(model: AccessKeyRoleUserDto) {
    if (this.userRoleId == 1) {
      this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('warning'), this.translate.instant('senior-manager-access-is-unchangeable'))
      return;
    }

    let id = model.id;

    if (id == 0 || id == undefined) {
      let objModel = Object.assign({}, model);
      objModel.accessKey = null;
      this.crudService.postAdd(Globals.UrlAccessKeyRoleUser, objModel).subscribe(res => {
        //window.console.log(model);
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))
          this.OnRefresh.next(objModel);
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'), this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      }, () => {
      });
    } else {
      this.crudService.putData(Globals.UrlAccessKeyRoleUser, model, id).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('successfully-edited'))
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'), this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
      }, () => {
      });
    }

  }
}
