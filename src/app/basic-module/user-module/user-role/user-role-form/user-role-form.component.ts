import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../../common-service/service/toast-message.service';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';

@Component({
  selector: 'user-role-form',
  templateUrl: './user-role-form.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserRoleFormComponent),
      multi: true
    },
  ]
})
export class UserRoleFormComponent implements OnInit {

  @Input()
  model: UserRoleDto ;
  @Output()
  OnSave: EventEmitter<UserRoleDto> =  new EventEmitter();

  formErrors = {
    Id:'',
    Title: '',
  };
    constructor(
        public translate: TranslateService,
    public dialogRef: MatDialogRef<UserRoleFormComponent>,
    private accessKeywordService:AccessKeywordService,
    private toastMessageService : ToastMessageService ) {
    this.model = new UserRoleDto(); 
  }
    addstring: string = ''
    editstring: string ='';
    isSaveButton:boolean = true;
    ngOnInit() {


      debugger;
       if(!this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_User_Role)){
        this.isSaveButton = false ;
       } 

        this.addstring = this.translate.instant('list-of-roles');
        this.editstring = this.translate.instant('edit-role');
    if(this.model.id==undefined){
      this.model.isActive = true;
    }
  }
  closeModal() {
    this.dialogRef.close();
  }

  
  titleFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if(!this.matcher.isErrorState(this.titleFormControl, form))
    {
      this.OnSave.next(this.model);    
    } else{
      console.log(form);
      //this.formErrors = this.formService.validateForm(form.form , this.formErrors, false)
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('Please-fill-out-the-form-completely'))
    }
  }
}
