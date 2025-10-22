import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { CountryProvinceCityDto } from 'app/common-service/models/Base/country-province-city.dto';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import moment from 'moment';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import { AppSearchToolDto } from 'app/models/app-search-tool.dto';
import { AccountDto } from 'app/student-module/models/account.dto';


@Component({
  selector: 'app-search-tool',
  templateUrl: './app-search-tool.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppReportSearchComponent),
      multi: true
    },
  ]
})
export class AppReportSearchComponent implements OnInit {

  @Input()
  title: string =this.translate.instant('search-shifts')

  @Input()
  isAccessToAll: boolean = false;

  @Output()
  OnSearch: EventEmitter<AppSearchToolDto> = new EventEmitter();

  dateTo: any;
  dateFrom: any;
  model: AppSearchToolDto;
  optionSelect: any = null;
  accounts: any[] = [];
  currencies: any[] = [];
  transactionTypes: any[] = [];
  transactionStatuses: any[] = [];
  branches: any[] = [];
  dangerLevels: any[] = [];

  accountfrom: AccountDto;
  accountto: AccountDto;

  processBtnView: boolean = false;
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private accessKeywordService: AccessKeywordService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.model = new AppSearchToolDto();
  }

  returnUrlAddress = 'index-info';
  ngOnInit() {
    this.getOption();
    this.model.shiftTypeId = 0;
    this.model.dateFrom = moment().day();
    this.model.dateTo = moment().day();
  }

  cities: any[] = [];
  provinces: any[] = [];
  users: any[] = [];
  cityOnProvince: CountryProvinceCityDto[] = []
  selectCity(item: any) {
    let id = item.value;
    this.cityOnProvince = this.cities.filter(f => f.parentId == id);
  }


  getOption() {

    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlShiftInfo, "GetSelectOptions").subscribe(res => {
      this.splashScreenService.hide();
      this.branches = res.branch;
      this.users = res.user;
    },
      error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
      });
  }

  onSearch() {
    this.model.dateFrom = this.dateFrom;
    this.model.dateTo = this.dateTo;
    this.OnSearch.next(this.model);
  }


  isLoading: boolean = false;
  OnSubmit(form: NgForm) {

  }
}
