import { Component, OnInit, Input, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
//import { ShiftInfoDto } from 'app/account-module/models/shift-info.dto';
import { PeriodDto } from 'app/class-module/models/priod.dto';

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeriodFormComponent),
      multi: true
    },
  ]
})
export class PeriodFormComponent implements OnInit {


  @Input()
  model: PeriodDto;

  @Output()
  OnRefreshList: EventEmitter<any> = new EventEmitter();
  
  
  constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        public splashScreenService: LoadingSplashScreenService,
        public dialogRef: MatDialogRef<PeriodFormComponent>,    
        private toastMessageService: ToastMessageService) {
        this.model = new PeriodDto();
      }

  returnUrlAddress = '';
  ngOnInit() {

    if(this.model.id==undefined || this.model.id==0){
      this.model.isActive = true;
    }
  }

  titleFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if(!this.matcher.isErrorState(this.titleFormControl, form))
    {
      this.OnSave(this.model);
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'), this.translate.instant('please-enter-correctly'))
    }
  }

  OnSave(model: PeriodDto) {
     
    this.splashScreenService.show();
    var id = model.id;
    if (id == 0 || id == undefined) {
      model.id = 0;
    }
    
    if(model.id==0){
      this.crudService.postAdd(Globals.UrlPeriod, model).subscribe(res => {
        if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
        this.dialogRef.close();
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
        }
        }, error => {
          this.splashScreenService.hide();
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
        },
        () => {
          this.dialogRef.close();

          this.splashScreenService.hide();
          
        })
      }else{
        this.crudService.putData(Globals.UrlPeriod, model, model.id).subscribe(res => {
          if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
          this.dialogRef.close();

          } else {
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
          }
        }, error => {
          this.splashScreenService.hide();
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
        },
        () => {
          this.splashScreenService.hide();          
          this.dialogRef.close();

        })
      }    
    }


    
  

  resetForm(){
    this.model = new PeriodDto();
    //this.model.applicantCode ='0';
  }

  
}
