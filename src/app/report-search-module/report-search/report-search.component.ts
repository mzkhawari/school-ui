import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { CountryProvinceCityDto } from 'app/common-service/models/Base/country-province-city.dto';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { ReportSearchConfigDto } from '../models/report-search-config.dto';
import { ReportSearchDto } from '../models/report-search.dto';
import { CashApiService } from 'app/cash-service/cash-api.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BranchDto } from 'app/branch-module/models/branch.dto';
import { AccountDto } from 'app/student-module/models/account.dto';

@Component({
  selector: 'app-report-search',
  templateUrl: './report-search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReportSearchComponent),
      multi: true
    },
  ]
})
export class ReportSearchComponent implements OnInit {



  @Input()
  title: string = this.translate.instant('transaction-report');

  @Input()
  config: ReportSearchConfigDto = { reportCode: 0 };
  @Input()
  modelInfo: ReportSearchDto;
  @Input()
  isShowPrintButton:boolean = false;
  // {
  //   isAccountFrom : true,
  //   isAccountTo : true,
  //   isCurrencyFrom : true,
  //   isCurrencyTo : true,
  //   isDateFrom : true,
  //   isDateTo : true,
  //   isBranchFrom : true,
  //   isBranchTo : true,
  //   isTransactionNo : true,
  //   isTransactionStatus : true,
  //   isTransactionType : false,

  //   isDangerLevel:false,
  //   isCheckPunishment:false,
  //   isPEP:false,
  //   isMountlyIncome:false,
  //   isSourceIncome:false,
  //   isTargetAccount:false,
  //   isTIN:false,
  //   isAmount: false,
  // }

  @Output()
  OnSearch: EventEmitter<ReportSearchDto> = new EventEmitter();
  
  @Output()
  OnPrint: EventEmitter<ReportSearchDto> = new EventEmitter();

  dateTo: any;
  dateFrom: any;
  model: ReportSearchDto;
  optionSelect: any = null;
  accounts: any[] = [];
  accountingCode: any[] = [];
  accountings: any[] = [];
  subAccountings: any[] = [];
  currencies: any[] = [];
  transactionTypes: any[] = [];
  transactionStatuses: any[] = [];
  branches: any[] = [];
  currentAccessBranchIds:any[]=[];
  brancheAllMonitoring: any[] = [];
  branchAlls: any[] = [];
  branchAllFrom: any[] = [];
  branchAllTo: any[] = [];
  dangerLevels: any[] = [];

  accountfrom: AccountDto;
  accountto: AccountDto;

  processBtnView: boolean = false;
  constructor(
    public translate: TranslateService,
    private cashApiService:CashApiService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.model = new ReportSearchDto();
  }
  public filteredBranchs: ReplaySubject<BranchDto[]> = new ReplaySubject<BranchDto[]>(1);
  public branchFilterCtrl: FormControl = new FormControl();
  
  private filterBranches() {


    if (!this.branches) {
      return;
    }
    debugger;
    // get the search keyword
    let search = this.branchFilterCtrl.value;
    if (!search) {
      this.filteredBranchs.next(this.branches.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBranchs.next(
      this.branches.filter(b => b.title.toLowerCase().indexOf(search) > -1 ||
        b.provinceTitle.toLowerCase().indexOf(search) > -1 ||
        b.cityTitle.toLowerCase().indexOf(search) > -1)
    );
  }

  returnUrlAddress = 'index-info';
  ngOnInit() {
    this.getOption();

    this.accountFilterApiCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterAccountApi();
    });

    this.accountFilterApiToCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterAccountApiTo();
    });

    this.branchFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterBranches();
    });


    if (this.config !== undefined) {
      if (this.config.isAmount) {
        this.model.amount = 500000;
      } else {
        this.model.amount == 0;
      }
    }
  }

  cities: any[] = [];
  provinces: any[] = [];
  cityOnProvince: CountryProvinceCityDto[] = []
  selectCity(item: any) {
    let id = item.value;
    this.cityOnProvince = this.cities.filter(f => f.parentId == id);
  }

  accCodeSubAcc: any[] = []
  selectSubAcc(item: any) {
    let id = item.value;
    this.accCodeSubAcc = this.subAccountings.filter(f => f.parentId == id);
    this.model.subAccountingId = 0;
  }

  isSuperAdmin = false;
  currentUserRoleId:number =0;
  currentBranchId:number =0;
  years:any[]=[];
  getOption() {

    this.cashApiService.getDataUrl<any>(Globals.UrlTransactionReport + "GetOptions").subscribe(res=>{
      debugger;
      if(res !=undefined){
        let data =  res as any;
        //this.cashApiService.myDictionary.set(Globals.UrlTransactionReport + "GetOptions", data);

          debugger;
        //this.filteredAccountApi.next(this.accounts.slice());
        //this.filteredAccountApiTo.next(this.accountTo.slice());
          this.years = res.data.financeYear;
          this.currencies = res.data.currency;
          this.transactionTypes = res.data.transferCashType;
          this.transactionStatuses = res.data.transferCashStatus;
          this.dangerLevels = res.data.dangerLevel;
          this.isSuperAdmin = res.isSuperAdmin;   
          //this.branches = res.branchAll; 
    
          
          
          //this.accountingCode = res.data.accountingCode;
          // this.subAccountings = this.accCodeSubAcc = res.data.subAccounting;
          // this.accountings = res.data.accounting;

        if(this.modelInfo != null){
          this.model.accountFromId = this.modelInfo.accountFromId;
          this.model.accountToId = this.modelInfo.accountToId;
        }

      }
        
    });


      this.cashApiService.getDataUrl<any>(Globals.UrlBranch + "GetSelectOptions").subscribe(res => {
          debugger;
          this.isSuperAdmin = res.isSuperAdmin;  
          if (res != undefined) {
            let data = res as any;
            
            this.branches = res.branch;
            this.currentAccessBranchIds = res.currentAccessBranchId;
            this.brancheAllMonitoring = res.branch;
            this.currentUserRoleId = res.currentUserRoleId;
            // if (this.branches.length === 1 || !this.isSuperAdmin) {
             
            //   this.branches.unshift({ id: -1, title: 'هیچکدام', provinceTitle: '', cityTitle: '' });
            // } else if (this.branches.length > 1 || this.isSuperAdmin) {
              
            //     this.branches.unshift({ id: 0, title: 'همه شعبه ها', provinceTitle: '', cityTitle: '' });
            // }
            this.filteredBranchs.next(this.branches.slice());
              this.branchAllFrom = this.branchAllTo = this.branchAlls = res.branchAll;
              this.currentBranchId = res.currentBranchId;
              if (this.branches.length == 1) {
                  this.model.branchId = this.branches[0].id
              }
          }

      });

      this.cashApiService.getDataUrl<any>(Globals.UrlCountryProvinceCity + "GetSelectOptions").subscribe(res => {
          debugger;
          if (res != undefined) {
              let data = res as any;
              this.provinces = res.province;
              this.cities = res.city;
          }

      });

    
  }

  setAccountFrom(item:any){
      let val = item.value;
      this.model.accountFromId = val;  
  }

  setAccountTo(item:any){
    let val = item.value;
    this.model.accountToId = val;  
}

  onSearch() {
        
    this.model.dateFrom = this.dateFrom;    
    this.model.dateTo = this.dateTo;
    if(this.dateFrom !=undefined){
      let date = new Date(this.dateFrom._d);
      this.model.dateFromStr = this.formatDate(date);
    }
    if(this.dateTo != undefined){
      let date = new Date(this.dateTo._d);
      this.model.dateToStr = this.formatDate(date);
    }
    if (this.model.mountlyIncomeFrom == undefined || this.model.mountlyIncomeFrom == null) {
      this.model.mountlyIncomeFrom = 0;
    }

    if (this.model.mountlyIncomeTo == undefined || this.model.mountlyIncomeTo == null) {
      this.model.mountlyIncomeTo = 0;
    }
    this.OnSearch.next(this.model);
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // ماه از ۰ شروع می‌شود
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  onPrint() {
    this.model.dateFrom = this.dateFrom;
    this.model.dateTo = this.dateTo;
    if (this.model.mountlyIncomeFrom == undefined || this.model.mountlyIncomeFrom == null) {
      this.model.mountlyIncomeFrom = 0;
    }

    if (this.model.mountlyIncomeTo == undefined || this.model.mountlyIncomeTo == null) {
      this.model.mountlyIncomeTo = 0;
    }
    this.OnPrint.next(this.model);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public filteredAccountApi: ReplaySubject<AccountDto[]> = new ReplaySubject<AccountDto[]>(1);
  public accountFilterApiCtrl: FormControl = new FormControl();
  private _onDestroy = new Subject<void>();
  private filterAccountApi() {

    
    let search = this.accountFilterApiCtrl.value;
    if (!search || search.length <3) {  
      //this.accounts =[];
      this.filteredAccountApi.next(this.accounts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    debugger;
    //this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlApplicant, `searchAccount/${search}`).subscribe(res => {
       // this.splashScreenService.hide();
        const accountAll = this.accounts = res;
        this.filteredAccountApi.next( accountAll);
    },
      error => {
        //this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
      });  
  }

  accountTo:any[]=[];
  public filteredAccountApiTo: ReplaySubject<AccountDto[]> = new ReplaySubject<AccountDto[]>(1);
  public accountFilterApiToCtrl: FormControl = new FormControl();
  private filterAccountApiTo() {

    
    let search = this.accountFilterApiToCtrl.value;
    if (!search || search.length <3) {  
      //this.accountTo =[];
      this.filteredAccountApiTo.next(this.accountTo.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    debugger;
    //this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlApplicant, `searchAccount/${search}`).subscribe(res => {
       // this.splashScreenService.hide();
        const accountAll = this.accountTo = res;
        this.filteredAccountApiTo.next( accountAll);
    },
      error => {
        //this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
      });  
  }


  selectBranchFrom($event:any){
    debugger;
    if($event.value==0){
      this.branchAllFrom = this.branchAlls;
    }else{
      if(!(this.currentAccessBranchIds.length >1 && this.currentAccessBranchIds.includes(this.model.reciverBranchId))){
        this.branchAllTo = this.branchAlls.filter(f=>f.id == this.currentBranchId);  
        this.model.reciverBranchId =this.currentBranchId;
      }
    }    
  }

  selectBranchTo($event:any){
    debugger;
    if($event.value==0){
      this.branchAllTo = this.branchAlls;
    }else{
      if(!(this.currentAccessBranchIds.length >1 && this.currentAccessBranchIds.includes(this.model.reciverBranchId))){
        this.branchAllFrom = this.branchAlls.filter(f=>f.id == this.currentBranchId);  
        this.model.branchId =this.currentBranchId;
      }
    }
  }

  isLoading: boolean = false;
  branchFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  
  OnSubmit(form: NgForm) {
    debugger;
    this.model.branchId = 0;
    if (this.model.transferCashTypeId == 1) {
      this.model.accountToId = this.model.accountFromId;
      this.model.reciverBranchId = this.model.branchId
    }
    if (this.model.transferCashTypeId == 1) {
      
    } else if (this.model.transferCashTypeId > 1 &&
      !this.matcher.isErrorState(this.branchFormControl, form)) {
  
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-enter-the-values-correctly'))
    }
  }

}
