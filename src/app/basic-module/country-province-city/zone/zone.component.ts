import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import { CountryProvinceCityDto } from '../models/country-province-city.dto';
import Globals from 'app/common-service/globals';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ZoneFormComponent } from './zone-form/zone-form.component';

@Component({
  selector: 'zone',
  templateUrl: './zone.component.html',
})
export class ZoneComponent implements OnInit {

  datasource: CountryProvinceCityDto[] = [];
  dataCountry: CountryProvinceCityDto[] = [];
  model: CountryProvinceCityDto;
  private baseUrlApi: string = "";
  //deviceInfo = null;
    constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService,
    private modalService: MatDialog,
    private toastMessageService: ToastMessageService,
    private accessKeywordService: AccessKeywordService,
    private splashScreenService: LoadingSplashScreenService) {
    this.baseUrlApi = Globals.UrlCountryProvinceCity;
  }

    columns = [{
        caption: this.translate.instant('operation'),
    width: 100,
    cellTemplate: 'editCellTemplate',
    fixed: "true",
    fixedPosition: "right",
  },
  {
    dataField: "Id",
    alignment: "right",
    caption:this.translate.instant('id'),
    sortOrder: "asc",
    width: 100,
    visible: false,
  },
  {
    dataField: "title",
    alignment: "center",
      caption: this.translate.instant('title'),
  },

  {
    dataField: "type",
    alignment: "center",
      caption: this.translate.instant('type')
  },
  {
    dataField: "priority",
    alignment: "center",
      caption: this.translate.instant('priority')
  },
  {
    dataField: "dangerLevel",
    alignment: "center",
    caption:this.translate.instant('danger-level'),
  },
  {
    dataField: "isActive",
    alignment: "center",
      caption: this.translate.instant('active/inactive'),
    isBool: true,
  },
  {
    dataField: "description",
    alignment: "center",
      caption: this.translate.instant('description')
  },
  ];



  private _unsubscribeAll: Subject<any> = new Subject<any>();
    titlelist:string=''
    isSaveButton:boolean = true;
    ngOnInit() {
        this.titlelist = "لیست زون ها";
    this.get();
    this.getCountry();

    if (!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Province_City)) {
      this.isSaveButton = false;
    }
  }

  onDeleteConfirm(id: number) {
    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {

        this.crudService.deleteById(this.baseUrlApi, id).subscribe(res => {
          if (res) {
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'), this.translate.instant('deleted-is-successfully'))
            this.get();
          }
          else {
            this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'),this.translate.instant('encountered-an-error'))
          }
        },
          error => {
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
          }, 
          () => {
            this.get();
          });
      }
    });
  }

  OnUpdate(item: CountryProvinceCityDto) {
    
    this.model = item;
    this.openDialogForm();
  }

  OnAdd() {
    
    this.model = undefined;
    this.openDialogForm()
  }

  openDialogForm() {
    const activeModal = this.modalService.open(ZoneFormComponent, { panelClass: 'search-filter-panel-modal', });
    activeModal.componentInstance.model = Object.assign({}, this.model);
    activeModal.componentInstance.countryProvinceCitis = this.dataCountry;
    activeModal.componentInstance.OnSave.subscribe((receivedEntry) => {
      this.OnSave(receivedEntry);      
      activeModal.close();
    });
  }

  private get() {
    if (!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Province_City)) {
      return;
    }
    this.splashScreenService.show();
    this.crudService.getDataUrl(this.baseUrlApi, `getZone`).subscribe(res => {
      this.datasource = res;
      this.splashScreenService.hide();
    },
      error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
      });
  }

  private getCountry() {
    this.crudService.getDataUrl(this.baseUrlApi, `getCountry`).subscribe(res => {
      this.dataCountry = res;
    },
      error => {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
      });
  }


  OnSave(model: CountryProvinceCityDto) {

    this.splashScreenService.show();
    let id = model.id;
    let resultPromise: any;
    if (id == 0 || id == undefined) {
      resultPromise = this.crudService.postAdd(this.baseUrlApi, model)
    } else {
      resultPromise = this.crudService.putData(this.baseUrlApi, model, id);
    }
    resultPromise.subscribe(res => {
      this.splashScreenService.hide();
      if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('successfully-registered'))
        this.get();
      } else {
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'), this.translate.instant('unknown-error'))
      }
    }, error => {
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
    },
      () => {
        this.get();

        this.splashScreenService.hide();
      });
  }
}
