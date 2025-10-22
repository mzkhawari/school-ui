
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccessKeyProvinceDto } from 'app/common-service/models/web-site/access-key-province.dto';
import { AccessKeyDto } from 'app/common-service/models/web-site/access-key.dto';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { NbToastStatus, ToastMessageService } from '../../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../../common-service/service/base-crud.service';
import Globals from '../../../../common-service/globals';
import { CountryProvinceCityDto } from '../../../country-province-city/models/country-province-city.dto';

@Component({
  selector: 'app-accesskey-province-form',
  templateUrl: './accesskey-province-form.component.html',
})
export class AccessKeyProvinceFormComponent implements OnInit {

  @Input()
  model: AccessKeyProvinceDto;
  @Input()
  OnRoleList: EventEmitter<UserRoleDto> = new EventEmitter();
  @Input()
  OnUserList: EventEmitter<UserDto> = new EventEmitter();
  @Input()
  OnAccessKeyList: EventEmitter<AccessKeyDto> = new EventEmitter();

  roles: UserRoleDto[] = [];
  users: UserDto[] = [];
  provinces: CountryProvinceCityDto[] = [];
  isFullAccessButton: boolean = false;

  onRoleAccess: number = 0;
  onTypeAccess: number = 0;
  listAccessWebKeys = [];
  parentFiledId: string = "AccessKeyParentId";
  //private formField : FormControl;
  constructor(public translate: TranslateService,
    private crudService: BaseCrudService, public dialogRef: MatDialogRef<AccessKeyProvinceFormComponent>, private base: FormBuilder, private toastMessageService: ToastMessageService) {
    this.model = new AccessKeyProvinceDto(0);
  }

  addstring: string = ''
  editstring: string = ''
  ngOnInit() {
    this.addstring =this.translate.instant('add-access');
    this.editstring = this.translate.instant('edit-access');
    this.getOption();



    if (this.model != undefined && this.model.id > 0) {
      this.isFullAccessButton = false;
    } else {
      this.isFullAccessButton = true;
    }

  }

  private getOption(): any {
    return this.crudService.getDataUrl(Globals.UrlAccessKeyProvince, 'GetSelectOptions').subscribe(res => {
      let value = res;
      this.provinces = value.province as CountryProvinceCityDto[];
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
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-fill-in-the-form-values-​​correctly'))
    }
  }

  OnSave(model: AccessKeyProvinceDto) {
    var id = model.id;
    if (id == 0 || id == undefined) {
      this.crudService.postAdd(Globals.UrlAccessKeyProvince, model).subscribe(res => {
        //window.console.log(model);
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'),this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      }, () => {
      });
    } else {
      this.crudService.putData(Globals.UrlAccessKeyProvince, model, id).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('success-message'),this.translate.instant('successfully-edited'))
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'),this.translate.instant('unknown-error'))
        }
      }, error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      }, () => {
      });

    }
  }
}
