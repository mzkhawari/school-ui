import { Component, OnInit, Input, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { PeriodDayDto } from 'app/class-module/models/priod-day.dto';
import { UserTypeDto } from 'app/common-service/models/web-site/user-type.dto';
import { UserTypeUserDto } from 'app/common-service/models/web-site/user-type-user.dto';

@Component({
  selector: 'app-user-type-form',
  templateUrl: './user-type-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserTypeFormComponent),
      multi: true
    },
  ]
})
export class UserTypeFormComponent implements OnInit {


  @Input()
  model: UserTypeDto;

  @Input()
  userId: number;

  @Output()
  OnRefreshList: EventEmitter<any> = new EventEmitter();
  
  
  constructor(
        public translate: TranslateService,
        private crudService: BaseCrudService,
        public splashScreenService: LoadingSplashScreenService,
        public dialogRef: MatDialogRef<UserTypeFormComponent>) {
        this.model = new UserTypeDto();
      }

  returnUrlAddress = '';
  userTypes:any[]=[];
  ngOnInit() {
    this.getOption();
    this.dateFrom = this.getCurrentDate(new Date());
  }


    getOption() {
        this.crudService.getDataUrl(Globals.UrlUser, "GetOptions").subscribe(res => {
            this.userTypes = res.userType;
        },
        error => {
        });
    }

  titleFormControl = new FormControl('', [Validators.required]);
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
      this.OnSave(this.model);
  }

  private getCurrentDate(date:any){
      const year = date.getFullYear(); // سال (مثلاً 2023)
      const month = date.getMonth() + 1; // ماه (۰ تا ۱۱، پس +۱ لازم است)
      const day = date.getDate(); // روز ماه
      if (month < 10 && day < 10) {       
        return `${year}-${0}${month}-${0}${day}`;
      }else if (month > 10 && day > 10) {
        return `${year}-${month}-${day}`;
      }else if (month < 10 && day > 10) {
        return `${year}-${0}${month}-${day}`; 
      }else if (month < 10 && day < 10) {
        return `${year}-${month}-${0}${day}`;   
      }
    }

   

  dateFrom:any= new Date();
  OnSave(model: UserTypeUserDto) {

    model.userId = this.userId;
    this.splashScreenService.show();
    
      this.crudService.postAdd(Globals.UrlUserTypeUser, model).subscribe(res => {
        if (res) {
          this.dialogRef.close();     
          this.OnRefreshList.next(true);
        }
        }, error => {
          this.splashScreenService.hide();
        },
        () => {
          this.splashScreenService.hide();          
        })
    }

  


  
}
