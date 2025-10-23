import { Component, OnInit, Input, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { ClassTimeDto } from 'app/class-module/models/class-time.dto';

@Component({
  selector: 'app-class-time-form',
  templateUrl: './class-time-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClassTimeFormComponent),
      multi: true
    },
  ]
})
export class ClassTimeFormComponent implements OnInit {


  @Input()
  model: ClassTimeDto;

  @Input()
  classInfoId: number;

  @Output()
  OnRefreshList: EventEmitter<any> = new EventEmitter();
  
  
  constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        public splashScreenService: LoadingSplashScreenService,
        public dialogRef: MatDialogRef<ClassTimeFormComponent>,    
        private toastMessageService: ToastMessageService) {
        this.model = new ClassTimeDto();
      }

  returnUrlAddress = '';
  periodList:any[]=[];
  userList:any[]=[];
  ngOnInit() {
    if(this.model.id==undefined || this.model.id==0){
      this.model.isActive = true;
    }
    this.getOption();
  }


    getOption() {
        this.crudService.getDataUrl(Globals.UrlClassTime, "GetSelectOptions").subscribe(res => {
            this.userList = res.user;
        },
        error => {
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
        });
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

  isRefresh:boolean=false;
  backBoolean(){
    if (this.isRefresh == false) {    
      this.isRefresh = true
    }else if (this.isRefresh == true) {
      this.isRefresh = false      
    }
    this.getOption();

  }

  OnSave(model: ClassTimeDto) {
     
    model.classInfoId = this.classInfoId;
    this.splashScreenService.show();
    var id = model.id;
    if (id == 0 || id == undefined) {
      model.id = 0;
    }
    
    if(model.id==0){
      this.crudService.postAdd(Globals.UrlClassTime, model).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
          // this.dialogRef.close();     
          this.OnRefreshList.next(true);
          this.model = new ClassTimeDto ()
          this.backBoolean()
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
        }
        }, error => {
          this.splashScreenService.hide();
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
        },
        () => {
          this.splashScreenService.hide();
          
        })
      }else{
        this.crudService.putData(Globals.UrlClassTime, model, model.id).subscribe(res => {
          if (res) {
            this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
            // this.dialogRef.close();     
            this.OnRefreshList.next(true);
            this.model = new ClassTimeDto ()
            this.backBoolean()     
          } else {
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
          }
        }, error => {
          this.splashScreenService.hide();
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
        },
        () => {
          this.splashScreenService.hide();          
        })
      }    
    }

  

  resetForm(){
    this.model = new ClassTimeDto();
    //this.model.applicantCode ='0';
  }


  setEditModel(item:ClassTimeDto){
    this.model = item;
  }

  
}
