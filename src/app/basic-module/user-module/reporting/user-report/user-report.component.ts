import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NbToastStatus, ToastMessageService } from  '../../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../../common-service/service/base-crud.service';
import { PersonDto } from 'app/common-service/models/person.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { LoadingComponent } from 'app/common-module/loading-component/loading/loading.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'user-report',
  templateUrl: './user-report.component.html',
  styleUrls:['./user-report.component.css']
})
export class UserReportComponent implements AfterViewInit  {

  modelSearch: any;
  
  dataUsers : any[]=[];
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
    dataField:"RoleTitle",
    alignment:"center",
    caption:this.translate.instant('user-role'),                   
  },
  {
    dataField:"IsActive",
    alignment:"center",
    caption:this.translate.instant('active'),                   
  },
  {
    dataField:"CreateDateFa",
    alignment:"center",
    caption:this.translate.instant('creation-date'),                   
  },
  {
    dataField:"UserFullName",
    alignment:"center",
    caption:this.translate.instant('user-creator'),                   
  }];

  
  ngOnInit() {
    
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

    if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Reset_Password)){
      return ;
    }
    this.Loading.show();
    this.modelSearch = model;
    this.cartypeService.getInclude(Globals.UrlUser).subscribe(res=>{       
      const data = res ;//   JSON.parse(res);
      this.Loading.hide();
      this.dataUsers = data.DataReport ;  
      this.dataHeaderReport = data.HeaderReport;
      let reportCount = this.dataUsers.length;
      this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('successful-search'),`${this.translate.instant('number')}${reportCount}${this.translate.instant('displayed-successfully')}`);
    },
    error =>{
      this.Loading.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    });
  }  
}