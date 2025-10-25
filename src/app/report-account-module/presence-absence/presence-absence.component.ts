import { Component, OnInit } from '@angular/core';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { TranslateService } from '@ngx-translate/core';
import { ActionType } from 'app/shared-grid/models/action-type';
import { IActionEmitter } from 'app/shared-grid/models/action-emitter';
import { ActionIcon } from 'app/shared-grid/models/action-icon';
import { ActionColor } from 'app/shared-grid/models/action-color';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { FormServerErrorMessageService } from 'app/common-service/validator-service/form-server-error-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportPresenceAbsenceComponent } from './report-presence-absence/report-presence-absence.component';

@Component({
  selector: 'app-presence-absence',
  templateUrl: './presence-absence.component.html',
})
export class PresenceAbsenceComponent implements OnInit {

  datasource : any[]=[];
  private baseUrlApi : string = "";
  accessItem :AccessItemDto;
    constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService, 
    private modalService: MatDialog, 
    // public dialogRef: MatDialogRef<PresenceAbsenceComponent>,
    private toastMessageService: ToastMessageService,
    private authService:AuthService,
    private accessKeywordService:AccessKeywordService,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private serverError: FormServerErrorMessageService ) {
      this.baseUrlApi = Globals.UrlPresenceAbsence ;        
   }

   routeSub: Subscription;
   routerEventsSub: Subscription;
   columns:any[]=[];
   title:string="";
   isBillMaterial:boolean = true;
   checkShowColumn(){

    this.columns = [    
        {
          dataField:"id", 
          alignment:"right", 
          caption:this.translate.instant('id'),
          sortOrder:"desc",
          width:80,
          visible: false,
        },        
        {
          dataField:"designShoesTitle",
          alignment:"center",
          caption: 'مدل',
        },   
        {
          dataField:"colorTitle",
          alignment:"center",
          caption: 'رنگ',
        },   
        { 
          dataField:"preFactorCount",
          alignment:"center",
          caption: 'پیش فاکتور',
        },   
        {
          dataField:"warehouseCount",
          alignment:"center",
          caption: 'موجود در انبار',
        }, 
        {
          dataField:"stationCutCount",
          alignment:"center",
          caption: 'بخش برش',
        }, 
        {
          dataField:"stationPastiCount",
          alignment:"center",
          caption: 'بخش پستی',
        },      
        {
          dataField:"stationPishkariCount",
          alignment:"center",
          caption: 'بخش پیشکاری',
        },   
        {
          dataField:"stationKarJamCount",
          alignment:"center",
          caption: 'بخش کارجمع کنی',
        },   
        {
          dataField:"totalCount",
          alignment:"center",
          caption: ' جمع کل',
        }, 
         {
          dataField:"totalNetCount",
          alignment:"center",
          caption: ' جمع خالص',
        },   
      ];
    }


    titlelist:string=''
    ngOnInit() {
      // از paramMap استفاده می‌کنیم تا به تغییرات پارامترهای مسیر واکنش نشان دهیم.
      // این Observable هر بار که پارامترها تغییر کنند (حتی بدون بارگذاری مجدد کامپوننت) یک مقدار جدید منتشر می‌کند.
      this.routeSub = this.activateRoute.paramMap.subscribe(params => {
        this.title = params.get('typeWarehouse');
        this.updateWarehouseType(this.title);
        // console.log("isBillMaterial در ngOnInit (paramMap):", this.isBillMaterial);
        this.get();
        this.checkShowColumn() // مطمئن شوید که get بعد از تنظیم isBillMaterial فراخوانی شود.
      });
    }

    updateWarehouseType(type: string) {
      if (type === "material") {
        this.titlelist = 'لیست انبار مواد اولیه';
        this.isBillMaterial = true;
      } else if (type === "produce") {
        this.titlelist = 'لیست موجودی محصولات';
        this.isBillMaterial = false;
      } else {
        this.titlelist = 'وضعیت موجودی با پیش فاکتور و تولید';
        this.isBillMaterial = false;
      }
    }
  
    ngOnDestroy() {
      if (this.routeSub) {
        this.routeSub.unsubscribe();
      }
      if (this.routerEventsSub) { // مطمئن شوید این هم Unsubscribe شود
        this.routerEventsSub.unsubscribe();
      }
    }

    OnSearch(){}

  onDeleteConfirm(item:any) {
    let id=item.id;
    // if(!this.accessKeywordService.checkAccessDelete(AccessKeyword.ACCKEY_Warehouse_Detail)){
    //   return ;
    // }
    this.toastMessageService.confirmDelete().subscribe((result) => {
      // console.log(result);
      if(result==='confirmed'){

      this.crudService.deleteById(this.baseUrlApi , id).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('deleted-is-successfully'))
            this.get();
          }
          else{
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('encountered-an-error'))
          }
      },
      error =>{
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    },() => {
      this.get();
    });
    } });
  }

  print(){
    console.log(this.datasource)
    const activeModal = this.modalService.open(ReportPresenceAbsenceComponent);
    activeModal.componentInstance.dataToPapOp = this.datasource;
  }


  isLoading:Boolean=false;
  private get(){
    // if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Warehouse_Detail)){
    //   return ;
    // }
    this.crudService.getDataUrl(this.baseUrlApi, `GetWarehouseByFactor`).subscribe(res=>{
      this.datasource = res ;     
    },
    error =>{
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    });
  }  

    actionList: ActionType[] = [
      // { isShow: true, title:this.translate.instant('edit'), icon: ActionIcon.Edit, level: ActionColor.Primary },
      // { isShow: true, title:this.translate.instant('delete'), icon: ActionIcon.Delete, level: ActionColor.Danger },
      { isShow: true, title:this.translate.instant('جزئیات'), icon: ActionIcon.Sliders, level: ActionColor.Success }
    ];
      
    onActionResult(data: IActionEmitter) {
      debugger;
      switch (data.index) {      
        case 0:  
        // this.OnUpdate(data.data);
        // break;      
        // case 1:
        //   this.onDeleteConfirm(data.data);        
        // break;
        //   case 2:
          //this.OnDetail(data.data);        
        break;
      }
    }
}
