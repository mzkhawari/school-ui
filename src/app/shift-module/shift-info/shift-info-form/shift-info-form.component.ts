import { Component, OnInit, Input, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { ShiftInfoDto } from 'app/student-module/models/shift-info.dto';

@Component({
  selector: 'app-shift-info-form',
  templateUrl: './shift-info-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShiftInfoFormComponent),
      multi: true
    },
  ]
})
export class ShiftInfoFormComponent implements OnInit {


  @Input()
  model: ShiftInfoDto;
  @Input()
  OnSelectOptionList: EventEmitter<any> = new EventEmitter();
  
  
  constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private activateRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<ShiftInfoFormComponent>,    
    private router: Router,
    private accessKeywordService:AccessKeywordService,
    private toastMessageService: ToastMessageService) {
    this.model = new ShiftInfoDto();
  }

  returnUrlAddress = '';
  ngOnInit() {

    if(!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Branch)){
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('message2'),this.translate.instant('you-do-not-have-access-toadd-to-the-list-in-this-section'));
      this.router.navigateByUrl('index-info');
      return;
    }  


    this.returnUrlAddress = 'shift/branches';
    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {      
      this.getItem(id);
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

  private getItem(id: number) {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlTransaction,'').subscribe(res => {
      this.splashScreenService.hide();
      if(res==undefined || res == null){
        this.model = new ShiftInfoDto();
      }else{
        this.model = res;
      }
    },
      error => {
        this.splashScreenService.hide();
      });
  }
}
