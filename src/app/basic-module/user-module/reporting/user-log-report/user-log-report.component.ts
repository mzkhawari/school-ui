import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NbToastStatus, ToastMessageService } from  '../../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../../common-service/service/base-crud.service';
import { FormServerErrorMessageService } from '../../../../common-service/validator-service/form-server-error-message.service';
import { PersonDto } from 'app/common-service/models/person.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { LoadingComponent } from 'app/common-module/loading-component/loading/loading.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'user-log-report',
  templateUrl: './user-log-report.component.html',
  styleUrls:['./user-log-report.component.css']
})
export class UserLogReportComponent implements AfterViewInit {

  modelSearch: any;
  
  dataLogUsers : any[]=[];
  dataHeaderReport:any;
  
  persons:PersonDto[]=[];
  isMultipleValue:number = 1;
  private baseUrlApi : string = "";
  @ViewChild('Loading') Loading:LoadingComponent;
  constructor(
              public translate: TranslateService,
              private cartypeService: BaseCrudService,
              private accessKeywordService:AccessKeywordService,
              private toastMessageService: ToastMessageService) {
      //this.modelSearch = new DataRecordSearchDto(0);
      this.baseUrlApi = Globals.UrlDataRecord;
   }
   
   ngAfterViewInit(){
    this.OnSearch();  
   }

   
   convertToPersianDay(gorgianDay:number) {
      return (7 - gorgianDay)-2;
   }

   columnsUsers = [{
    dataField:"Id",
    alignment:"center",
    caption:this.translate.instant('id'),                   
    width:120,
    heigth:60,
    visible:false,
  },
  {
    dataField:"FullName",
    alignment:"center",
    caption:this.translate.instant('username'),                   
    width:120,
  },
  {
    dataField:"UserName",
    alignment:"center",
    caption:this.translate.instant('username2'),                   
  },
  {
    dataField:"Email",
    alignment:"center",
    caption:this.translate.instant('email'),                   
  },
  {
    dataField:"Title",
    alignment:"center",
    caption:this.translate.instant('user-role'),                   
  },  
  {
    dataField:"LogDateFa",
    alignment:"center",
    caption:this.translate.instant('traffic-date'),                   
  }];
  
  ngOnInit() {
    this.OnSearch();   
  }

  person:PersonDto;
  onChangePerson(value:any){
    console.log(value);
    this.person = value;
  }

  OptionSelect:any ;
  private getSelectOption(){
    this.cartypeService.getDataUrl(Globals.UrlDataRecord, "GetSelectOptions").subscribe(res=>{
      this.OptionSelect = res ;
      this.persons = this.OptionSelect.Person as PersonDto[];        
    });
  }

  OnSearch(model?: any){

    this.Loading.show();
    this.modelSearch = model;
    this.cartypeService.getInclude(Globals.UrlUser).subscribe(res=>{       
      const data = res ;//   JSON.parse(res);
      this.Loading.hide();
      this.dataLogUsers = data.DataReport ;  
      this.dataHeaderReport = data.HeaderReport ;  
      let reportCount = this.dataLogUsers.length;
      this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('successful-search'),`${this.translate.instant('number')}${reportCount}${this.translate.instant('displayed-successfully')}`);
    },
    error =>{
      this.Loading.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
    });
  }  
}
