import { Component, OnInit, Input, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { PeriodDayDto } from 'app/class-module/models/priod-day.dto';

@Component({
  selector: 'app-period-day-form',
  templateUrl: './period-day-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeriodDayFormComponent),
      multi: true
    },
  ]
})
export class PeriodDayFormComponent implements OnInit {


  @Input()
  model: PeriodDayDto;

  @Input()
  periodId: number;

  @Output()
  OnRefreshList: EventEmitter<any> = new EventEmitter();
  
  
  constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        public splashScreenService: LoadingSplashScreenService,
        public dialogRef: MatDialogRef<PeriodDayFormComponent>,    
        private toastMessageService: ToastMessageService) {
        this.model = new PeriodDayDto();
      }

  returnUrlAddress = '';
  periodList:any[]=[];
  userList:any[]=[];
  ngOnInit() {
    this.getOption();
    this.dateFrom = this.getCurrentDate(new Date());
  }


    getOption() {
        this.crudService.getDataUrl(Globals.UrlPeriodDay, "GetSelectOptions").subscribe(res => {
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

  private getCurrentDate(date:any){
      const year = date.getFullYear(); // سال (مثلاً 2023)
      const month = date.getMonth() + 1; // ماه (۰ تا ۱۱، پس +۱ لازم است)
      const day = date.getDate(); // روز ماه
      if (month < 10 && day < 10) {       
        return `${year}-${0}${month}-${0}${day}`;
      }else if (month >= 10 && day > 10) {
        return `${year}-${month}-${day}`;
      }else if (month < 10 && day > 10) {
        return `${year}-${0}${month}-${day}`; 
      }else if (month >= 10 && day < 10) {
        return `${year}-${month}-${0}${day}`;   
      }
    }

   

  dateFrom:any= new Date();
  OnSave(model: PeriodDayDto) {

    debugger;
    if (this.dateFrom !== undefined) {
        if (this.dateFrom._d !== undefined) {
          let date: Date = this.dateFrom._d;
          this.model.dateOfClass = this.getCurrentDate(date);
        } else {
          let date: Date = new Date(this.dateFrom);
          this.model.dateOfClass = this.getCurrentDate(date);
        }
      }
     
    model.periodId = this.periodId;
    this.splashScreenService.show();
    var id = model.id;
    if (id == 0 || id == undefined) {
      model.id = 0;
    }
    
    if(model.id==0){
      this.crudService.postDataUrl(Globals.UrlPeriodDay, "PostValue", model).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
          this.OnRefreshList.next(true);
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
        this.crudService.putDataUrl(Globals.UrlPeriodDay, "putValue", model).subscribe(res => {
          if (res) {
            this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
            this.OnRefreshList.next(true);     
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
    this.model = new PeriodDayDto();
    //this.model.applicantCode ='0';
  }


  setEditValue(item: PeriodDayDto){

    this.model = item;
    this.dateFrom = this.model.dateOfClass;
  }

  
}
