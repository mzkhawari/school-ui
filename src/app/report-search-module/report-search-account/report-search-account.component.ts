import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { ReportSearchAccountDto } from '../models/report-search-account.dto';
import { AccountDto } from 'app/student-module/models/account.dto';


@Component({
  selector: 'app-report-search-account',
  templateUrl: './report-search-account.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReportSearchAccountComponent),
      multi: true
    },
  ]
})
export class ReportSearchAccountComponent implements OnInit {



  @Input()
  title:string= this.translate.instant('transaction-report');
  
  
  @Output()
  OnSearch: EventEmitter<ReportSearchAccountDto> =  new EventEmitter();
  
  dateTo:any = undefined;
  dateFrom:any = undefined;
  model: ReportSearchAccountDto;

  accountfrom:AccountDto;
  accountto:AccountDto;

  processBtnView:boolean= false;
    constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.model = new ReportSearchAccountDto();
    this.model.isTempAccount = true;    
    this.model.isAllwaysAccount = true;

  }

  returnUrlAddress = 'index-info';
  ngOnInit() {
    this.getOption();    
  }

  accountStatus: any[] = [];
  accountTypes: any[] = [];
  genders:any[]=[];
  identityTypes:any[]=[];
  provinces:any[]=[];
  cities:any[]=[];
  branches:any[]=[];
  dangerLevels:any[]=[];

  getOption() {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlApplicant, "GetSelectOptions").subscribe(res => {
      this.splashScreenService.hide();

      this.accountStatus = res.accountStatus;
      this.accountTypes = res.accountType;
      this.genders = res.gender;
      this.identityTypes = res.identityType;
      this.dangerLevels = res.dangerLevel;
    },
      error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
        });


      this.crudService.getDataUrl(Globals.UrlBranch, "GetSelectOptions").subscribe(res => {
          this.splashScreenService.hide();

          this.branches = res.branch;
          if (this.branches.length == 1) {
              this.model.branchId = this.branches[0].id;
          }
      },
          error => {
              this.splashScreenService.hide();
          });

      this.crudService.getDataUrl(Globals.UrlCountryProvinceCity, "GetSelectOptions").subscribe(res => {
          this.splashScreenService.hide();
          this.provinces = res.province;
          this.cities = res.city;
      },
          error => {
              this.splashScreenService.hide();
          });
  }

  onSearch(){
    if(this.model.incomeFrom == undefined || this.model.incomeFrom == null ){
      this.model.incomeFrom =0;
    }
    if(this.model.incomeTo == undefined || this.model.incomeTo == null ){
      this.model.incomeTo = 0;
    }
    this.model.dateFrom = this.dateFrom;
    this.model.dateTo = this.dateTo;
    this.OnSearch.next(this.model);    
  }


  isLoading: boolean = false;
  OnSubmit(form: NgForm) {

  }
}
