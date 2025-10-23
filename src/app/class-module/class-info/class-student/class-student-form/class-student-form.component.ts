import { Component, OnInit, Input, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { StudentClassInfoDto } from 'app/class-module/models/student-class-info.dto';
import { StudentDto } from 'app/student-module/models/student.dto';

@Component({
  selector: 'app-class-student-form',
  templateUrl: './class-student-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClassStudentFormComponent),
      multi: true
    },
  ]
})
export class ClassStudentFormComponent implements OnInit {


  @Input()
  model: StudentClassInfoDto;

  @Input()
  classInfoId: number;

  @Output()
  OnRefreshList: EventEmitter<any> = new EventEmitter();
  
  
  constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        public splashScreenService: LoadingSplashScreenService,
        public dialogRef: MatDialogRef<ClassStudentFormComponent>,    
        private toastMessageService: ToastMessageService) {
        this.model = new StudentClassInfoDto();
        this.modelStudent = new StudentDto();
      }

  returnUrlAddress = '';
  periodList:any[]=[];
  studentList:any[]=[];
  code:string =""
  ngOnInit() { 
  }



  OnSubmit(form: NgForm) {
  }

  onAdd(){
    this.model.classInfoId = this.classInfoId;
    this.model.studentId = this.modelStudent.id;
    this.OnSave(this.model);
  }
  modelStudent: StudentDto;
  onSearch(){
      let id =  this.code;
      this.modelStudent = {};
      this.splashScreenService.show();
      this.crudService.getDataUrl(Globals.UrlStudent, `getStudentInfo/${id}`).subscribe(res => {
        this.splashScreenService.hide();
        if(res !=null){
          this.modelStudent = res;
        }else{
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "آموزشیاری با این کد وجود ندارد")
        }
      },
        error => {
          this.splashScreenService.hide();
        });
  }

  isRefresh2:boolean=false;
  backBoolean(){
    if (this.isRefresh2 == false) {    
      this.isRefresh2 = true
    }else if (this.isRefresh2 == true) {
      this.isRefresh2 = false      
    }
    // this.getOption();
  }

  isRefresh:boolean = false;
  OnSave(model: StudentClassInfoDto) {
     

    
    debugger;
    this.isRefresh = false;
    model.classInfoId = this.classInfoId;
    this.code ="";
    model.id =0;
      this.crudService.postDataUrl(Globals.UrlStudentClassInfo, "PostValue", model).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
          this.isRefresh = !this.isRefresh;
          this.OnRefreshList.next(true);
          this.modelStudent ={};
          this.model = new StudentClassInfoDto ()
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
          this.isRefresh = false;
          
        })
    }

  
}
