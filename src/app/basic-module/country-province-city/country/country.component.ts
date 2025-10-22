import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from  '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import { FormServerErrorMessageService } from '../../../common-service/validator-service/form-server-error-message.service';
import { CountryProvinceCityDto } from '../models/country-province-city.dto';
import { MatDialog } from '@angular/material/dialog';
import Globals from 'app/common-service/globals';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CountryFormComponent } from './country-form/country-form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit {


  datasource : CountryProvinceCityDto[]=[];
  
  model : CountryProvinceCityDto;
  private baseUrlApi : string = "";
  //deviceInfo = null;
  constructor(
              public translate: TranslateService,
              private cartypeService: BaseCrudService, 
              private modalService: MatDialog, 
              private toastMessageService: ToastMessageService ,
              private _changeDetectorRef: ChangeDetectorRef ) {
      this.baseUrlApi = Globals.UrlCountryProvinceCity;      
  }
   
  columns = [{
      caption:this.translate.instant('operation'),
      dataField:"actions", 
    },
     {
        dataField:"Id", 
        alignment:"right", 
        caption:this.translate.instant('id') ,
        sortOrder:"asc",        
        width:100,
        visible: false,
    },
    {
      dataField:"Title",
      alignment:"center",
      caption:this.translate.instant('title'),                   
    }, 
    {
        dataField:"Type",
        alignment:"center",
        caption:this.translate.instant('type'),
    },
    {
      dataField:"Priority",
      alignment:"center",
      caption:this.translate.instant('priority'),
    },    
    {
        dataField:"IsActive",
        alignment:"center",
        caption:this.translate.instant('active'),    
        isBool:true,                                    
    },
    {
      dataField:"Description",
      alignment:"center",
      caption:this.translate.instant('description'),                   
    },
];



  
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  ngOnInit() {
    this.get();    
  }

  onDeleteConfirm(id:number) {
    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){

      this.cartypeService.deleteById(this.baseUrlApi, id).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'), this.translate.instant('deleted-is-successfully'))
            this.get();
          }
          else{
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('encountered-an-error'))
          }
      },
      error =>{
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
    },() => {
      this.get();
    });
    } });
  }
  
  OnUpdate(item : CountryProvinceCityDto) {
     
    //window.console.log(item);
    this.model = item;
    this.openDialogForm();
  }
 
  OnAdd() {
    this.model =undefined;
    this.openDialogForm()
  }


  openDialogForm() {
    const activeModal = this.modalService.open( CountryFormComponent);
    activeModal.componentInstance.model = Object.assign({},  this.model);
    activeModal.componentInstance.OnSave.subscribe((receivedEntry) => {
      this.OnSave(receivedEntry);
      activeModal.close();
    });
  }
  

  private get(){
    
  }


  OnSave(model: CountryProvinceCityDto){    
    let id = model.id;
    let resultPromise:any;
    if(id==0 || id==undefined ){
      model.type = 1;    
      resultPromise = this.cartypeService.postAdd(this.baseUrlApi,model);
    }else{
      resultPromise = this.cartypeService.putData(this.baseUrlApi,model,id);
    }
    resultPromise.subscribe(res=>{
      if(res){        
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, this.translate.instant('success-message'), this.translate.instant('successfully-registered'))      
        }else{
          this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))      
        }
      },error =>{
          this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);        
      },
      () => {
        this.get();
      });
  }
}
