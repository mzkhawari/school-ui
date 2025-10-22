import { Component, OnInit, Input, EventEmitter, forwardRef } from '@angular/core';
import { Validators, FormControl, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import Globals from 'app/common-service/globals';
import { dateTimeDto } from 'app/common-service/models/dateTime.dto';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../../common-service/service/toast-message.service';
import { BranchDto } from 'app/branch-module/models/branch.dto';


@Component({
  selector: 'User-form',
  templateUrl: './User-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFormComponent),
      multi: true
    },
  ]
})
export class UserFormComponent implements OnInit {


  @Input()
  model: UserDto;
  @Input()
  OnSelectOptionList: EventEmitter<any> = new EventEmitter();
  @Input()
  OptionList: string[];

  BirthDay: dateTimeDto = null;
  MarridDate: dateTimeDto = null;
  optionSelect: any = null;
  roles: UserRoleDto[] = [];
  branches: BranchDto[] = [];

  formErrors = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: ''
  };

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private crudService: BaseCrudService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    public splashScreenService: LoadingSplashScreenService,
    private accessKeywordService: AccessKeywordService,
    private authService: AuthenticateService,
    private toastMessageService: ToastMessageService) {
    this.model = new UserDto(0);
  }

  ishomepage: boolean = false;
  returnUrlAddress: string = '';
  addstring: string = '';
  editstring: string = '';
  isViewForm: boolean = false;
  isSaveButton: boolean = true;
  ngOnInit() {

    if (!this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Branch_User)) {
      //this.toastMessageService.showToast(NbToastStatus.WARNING, "پیام", "شما دسترسی به افزودن ندارید");
      //this.router.navigateByUrl('index-info');
      //return;
      this.isSaveButton = false;
    }

    this.addstring = this.translate.instant('add-user');
    this.editstring = this.translate.instant('edit-user');
    if (this.model.id == undefined) {
      this.model.id = 0;
      this.model.isActive = true;
    }
    this.OnSelectOptionList.subscribe(res => {
      this.optionSelect = res as any;
      this.roles = this.optionSelect.userRole as UserRoleDto[];
      this.branches = this.optionSelect.branch as BranchDto[];
    });

    this.imageURL = this.model.picUrlAvatar;

    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      this.returnUrlAddress = '/index-info';
      this.ishomepage = true;
      this.getItem(id);
      this.isViewForm = true;
      this.getSelectOptions().subscribe(res => {
        this.optionSelect = res as any;
        this.roles = this.optionSelect.userRole as UserRoleDto[];
        this.branches = this.optionSelect.branch as BranchDto[];
      });
    }
  }

  private getSelectOptions(): any {
    return this.crudService.getDataUrl(Globals.UrlUser, "GetSelectOptions");
  }

  private getItem(id: number) {
    this.splashScreenService.show();
    this.crudService.getById(Globals.UrlUser, id).subscribe(res => {
      this.splashScreenService.hide();
      this.model = res;
      this.imageURL = this.model.picUrlAvatar;

    },
      error => {
        this.splashScreenService.hide();
      });
  }

  //#endregion image Upload avatar
  selectedFileAvatar?: File;
  imageURL: string = "../../../../assets/images/Akramzada/avatar-pic.png";
  setImage(item) {
    const file = (item.target as HTMLInputElement).files[0];
    this.selectedFileAvatar = file;
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  //#endregion


  closeModal() {
    this.dialogRef.close();
  }


  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  roleFormControl = new FormControl('', [Validators.required]);
  userNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if (!this.matcher.isErrorState(this.firstNameFormControl, form) &&
      !this.matcher.isErrorState(this.lastNameFormControl, form) &&
      !this.matcher.isErrorState(this.roleFormControl, form) &&
      !this.matcher.isErrorState(this.userNameFormControl, form)) {
      this.OnSave(this.model);
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-fill-in-the-form-values-​​correctly'))
    }
  }

  OnSave(model: UserDto) {

    if (model.accCodeId == null || model.accCodeId == undefined) {
      model.accCodeId = 0;
    }
    var id = model.id;
    if (id == 0 || id == undefined) {
      model.id = 0;
    }
    if (model.branchId == null) {
      model.branchId = 0;
    }
    const formData: FormData = new FormData();
    let modelData: any = model;
    for (const key in modelData) {
      if (modelData.hasOwnProperty(key)) {
        formData.append(key, modelData[key]);
      }
    }
    if (this.selectedFileAvatar) {
      let name = this.selectedFileAvatar.name;
      //let ext = name !== '' ? name.split('.')[1] : '';
      formData.append('file', this.selectedFileAvatar, `avatar-${name}`);
    }



    model.isActive = true;
    this.crudService.postFormData(`${Globals.UrlUser}postUserAvatar`, formData).subscribe(res => {
      if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))
        this.dialogRef.close();
      } else {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))
      }
    }, error => {
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    },
      () => {
        this.model = new UserDto();
        this.dialogRef.close();
      })
  }
}
