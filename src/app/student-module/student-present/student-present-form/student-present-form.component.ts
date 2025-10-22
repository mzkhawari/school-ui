import { Component, OnInit, Input, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { StudentDto } from 'app/class-module/models/student.dto';
import { ShiftInfoDto } from 'app/student-module/models/shift-info.dto';

@Component({
  selector: 'app-student-present-form',
  templateUrl: './student-present-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StudentPresentFormComponent),
      multi: true
    },
  ]
})
export class StudentPresentFormComponent implements OnInit {


  @Input()
  model: StudentDto;

  @Output()
  OnRefreshList: EventEmitter<any> = new EventEmitter();
  
  
  constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    public dialogRef: MatDialogRef<StudentPresentFormComponent>,    
    private toastMessageService: ToastMessageService) {
    this.model = new ShiftInfoDto();
  }

  returnUrlAddress = '';
  ngOnInit() {

    // if(!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Branch)){
    //   this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('message2'),this.translate.instant('you-do-not-have-access-toadd-to-the-list-in-this-section'));
    //   this.router.navigateByUrl('index-info');
    //   return;
    // }  


    // this.returnUrlAddress = '';
    // let id = this.activateRoute.snapshot.params['id'];
    // if (id !== undefined && id > 0) {      
    //   this.getItem(id);
    // }
  }

  titleFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  byStudents:any[]=[{id:1,title:'همراه مادر'},{id:2, title:'همراه پدر'},{id:3, title:'سایر'}];
  byPersonId:number =0;
  OnSubmit(form: NgForm) {
    if(!this.matcher.isErrorState(this.titleFormControl, form))
    {
      this.OnSave(this.model);
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'), this.translate.instant('please-enter-correctly'))
    }
  }

  OnSave(model: ShiftInfoDto) {
     
    this.splashScreenService.show();
    var id = model.id;
    if (id == 0 || id == undefined) {
      model.id = 0;
    }
    
    if(model.id==0){
      this.crudService.postAdd(Globals.UrlShiftInfo, model).subscribe(res => {
        if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
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
        this.crudService.putData(Globals.UrlShiftInfo, model, model.id).subscribe(res => {
          if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
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

  getItem() {
    let id =  this.model.applicantCode;
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlApplicant, `getStudentInfo/${id}`).subscribe(res => {
      this.splashScreenService.hide();
      if(res !=null){
        this.model = res;
      }else{
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "آموزشیاری با این کد وجود ندارد")
      }
    },
      error => {
        this.splashScreenService.hide();
      });
  }

  resetForm(){
    this.model = new StudentDto();
    this.model.applicantCode ='0';
  }

  setEntranceInOut() {
    debugger;
    let id = this.model.applicantCode;
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlApplicantPersent, `setStudentInOut/${id}/${this.byPersonId}`).subscribe(res => {
      this.splashScreenService.hide();
      if(res==1){
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "حضور با موفقیت ثبت شد")
      }else if(res==2){
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "خروج با موفقیت ثبت شد")
      }else if(res==3){
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "خروج قبلا ثبت شده است")       
      }else if(res==4){
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "ورود قبلا ثبت شده است")
      } 
      this.resetForm();
      this.OnRefreshList.next(true);
    },
      error => {
        this.splashScreenService.hide();
      });
  }
}
