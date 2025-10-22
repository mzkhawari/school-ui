
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder,  NgForm } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccessKeyProvinceDto } from 'app/common-service/models/web-site/access-key-province.dto';
import { AccessKeyDto } from 'app/common-service/models/web-site/access-key.dto';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { NbToastStatus, ToastMessageService } from '../../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../../common-service/service/base-crud.service';
import Globals from '../../../../common-service/globals';
import { AccessKeyBranchDto } from 'app/common-service/models/web-site/access-key-branch.dto';
import { BranchDto } from 'app/branch-module/models/branch.dto';

@Component({
  selector: 'app-accesskey-branch-form',
  templateUrl: './accesskey-branch-form.component.html',
})
export class AccessKeyBranchFormComponent implements OnInit {

  @Input()
  model: AccessKeyBranchDto;
  @Input()
  OnRoleList: EventEmitter<UserRoleDto> = new EventEmitter();
  @Input()
  OnUserList: EventEmitter<UserDto> = new EventEmitter();
  @Input()
  OnAccessKeyList: EventEmitter<AccessKeyDto> = new EventEmitter();

  roles: UserRoleDto[] = [];
  users: UserDto[] = [];
  branches: BranchDto[] = [];
  isFullAccessButton: boolean = false;

  onRoleAccess: number = 0;
  onTypeAccess: number = 0;
  listAccessWebKeys = [];
  parentFiledId: string = "AccessKeyParentId";
  //private formField : FormControl;
  constructor(public translate: TranslateService,
    private crudService: BaseCrudService, public dialogRef: MatDialogRef<AccessKeyBranchFormComponent>, private base: FormBuilder, private toastMessageService: ToastMessageService) {
    this.model = new AccessKeyProvinceDto(0);
  }

  addstring: string = ''
  editstring: string = ''
  ngOnInit() {
    this.addstring = this.translate.instant('add-access');
    this.editstring = this.translate.instant('edit-access');
    this.getOption();



    if (this.model != undefined && this.model.id > 0) {
      this.isFullAccessButton = false;
    } else {
      this.isFullAccessButton = true;
    }

  }

  private getOption(): any {
    return this.crudService.getDataUrl(Globals.UrlAccessKeyBranch, 'GetSelectOptions').subscribe(res => {
      let value = res;
      this.branches = value.branch as BranchDto[];
      this.roles = value.userRole as UserRoleDto[];
      this.users = value.user as UserDto[];
    });
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




  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if (form.valid) {
      this.OnSave(this.model);
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('Please-fill-out-the-form-completely'))
    }
  }

  OnSave(model: AccessKeyProvinceDto) {
    var id = model.id;
    if (id == 0 || id == undefined) {
      this.crudService.postAdd(Globals.UrlAccessKeyBranch, model).subscribe(res => {
        //window.console.log(model);
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      }, () => {
      });
    } else {
      this.crudService.putData(Globals.UrlAccessKeyBranch, model, id).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('success-message'),this.translate.instant('successfully-edited'))
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'), this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      }, () => {
      });

    }
  }
}
