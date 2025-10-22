import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
//import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { ChangePassword } from '../models/change-pass.dto';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector     : 'reset-password',
    templateUrl  : './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResetPasswordComponent implements OnInit
{
    // alert: { type: FuseAlertType; message: string } = {
    //     type   : 'success',
    //     message: ''
    // };
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        public translate: TranslateService,
        private crudService:BaseCrudService,
        private router:Router,
        private toastMessageService:ToastMessageService
    )
    {
        this.model = new ChangePassword();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        // this.resetPasswordForm = this._formBuilder.group({
        //         passwordCurrent: ['', Validators.required],
        //         password       : ['', Validators.required],
        //         passwordConfirm: ['', Validators.required]
        //     },
        //     {
        //         validators: FuseValidators.mustMatch('password', 'passwordConfirm')
        //     }
        // );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    model:ChangePassword;
     currentPasswordControl = new FormControl('', [Validators.required]);
     newPasswordControl = new FormControl('', [Validators.required]);
     newPasswordConfirmControl = new FormControl('', [Validators.required , FuseValidators.mustMatch('newPassword', 'newPasswordConfirm')]);
     matcher = new MyErrorStateMatcher();
     OnSubmit(form: NgForm) {
        if(!this.matcher.isErrorState(this.currentPasswordControl, form) && 
           !this.matcher.isErrorState(this.newPasswordConfirmControl, form)&& 
           !this.matcher.isErrorState(this.newPasswordControl, form))
        { 
          this.OnSave(this.model);    
        } else{
          this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-fill-in-the-form-values-​​correctly'))
        }   
    }

    OnSave(model: ChangePassword){
          if(model.currentPassword== model.newPassword){
            this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-choose-a-new-password'))
            return;
          }

          this.crudService.postDataUrl(Globals.UrlAuth, "changePassword", model).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))      
          }else{
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))      
          }
          }, error =>{        
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
          },
          () => {
            ////this.model = new ChangePassword();
            this.router.navigateByUrl('index-info');
          })
      }
}
