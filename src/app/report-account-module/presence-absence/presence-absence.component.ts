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
  classList:any[]=[];
  yearList:any[]=[];
  yearId:number;
  classId:number;
  returnUrlAddress:string;
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

  //  res:any[]=[
  //   {id:"1",code:2,day701:1,day702:1,day703:1,day704:1,day705:1,day706:1,day707:1,day708:1,day709:1,day7010:1,day7011:1,day7012:1,day7013:1,day7014:1}
  //  ]

   res:any[]=[
    {id:"1",fullName:'رضا فدایی',code:34234,day:[{title:"7/01",status:1},{title:"7/02",status:0},{title:"7/03",status:1},{title:"7/04",status:1},{title:"7/04",status:0},{title:"7/05",status:1},{title:"7/06",status:1},{title:"7/07",status:0},{title:"7/08",status:1},{title:" 7/09",status:1},{title:" 7/10",status:1},{title:" 7/11",status:1},{title:" 7/12",status:1},{title:" 7/13",status:0},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:1},{title:" 7/17",status:0},]},
    {id:"2",fullName:'احمد رضایی',code:234234,day:[{title:" 7/01",status:1},{title:" 7/02",status:1},{title:" 7/03",status:1},{title:" 7/04",status:1},{title:" 7/04",status:1},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:1},{title:" 7/08",status:1},{title:" 7/09",status:1},{title:" 7/10",status:1},{title:" 7/11",status:1},{title:" 7/12",status:1},{title:" 7/13",status:1},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:1},{title:" 7/17",status:1},]},
    {id:"3",fullName:'محسن کریمی',code:23123,day:[{title:" 7/01",status:1},{title:" 7/02",status:2},{title:" 7/03",status:1},{title:" 7/04",status:0},{title:" 7/04",status:0},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:1},{title:" 7/08",status:0},{title:" 7/09",status:1},{title:" 7/10",status:1},{title:" 7/11",status:1},{title:" 7/12",status:1},{title:" 7/13",status:1},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:1},{title:" 7/17",status:1},]},
    {id:"4",fullName:'علی اخلاقی',code:432323,day:[{title:" 7/01",status:2},{title:" 7/02",status:2},{title:" 7/03",status:1},{title:" 7/04",status:1},{title:" 7/04",status:0},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:1},{title:" 7/08",status:1},{title:" 7/09",status:1},{title:" 7/10",status:1},{title:" 7/11",status:1},{title:" 7/12",status:0},{title:" 7/13",status:1},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:1},{title:" 7/17",status:1},]},
    {id:"5",fullName:'محمد زکی خاوری',code:344343,day:[{title:" 7/01",status:1},{title:" 7/02",status:1},{title:" 7/03",status:1},{title:" 7/04",status:1},{title:" 7/04",status:1},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:2},{title:" 7/08",status:2},{title:" 7/09",status:1},{title:" 7/10",status:1},{title:" 7/11",status:1},{title:" 7/12",status:2},{title:" 7/13",status:1},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:0},{title:" 7/17",status:1},]},
    {id:"6",fullName:'حسن انصاری',code:5445,day:[{title:" 7/01",status:2},{title:" 7/02",status:1},{title:" 7/03",status:1},{title:" 7/04",status:0},{title:" 7/04",status:2},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:0},{title:" 7/08",status:0},{title:" 7/09",status:1},{title:" 7/10",status:0},{title:" 7/11",status:2},{title:" 7/12",status:0},{title:" 7/13",status:0},{title:" 7/14",status:1},{title:" 7/15",status:0},{title:" 7/16",status:1},{title:" 7/17",status:2},]},
    {id:"7",fullName:'مصطفی میرزایی',code:3434,day:[{title:" 7/01",status:1},{title:" 7/02",status:1},{title:" 7/03",status:1},{title:" 7/04",status:1},{title:" 7/04",status:2},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:1},{title:" 7/08",status:1},{title:" 7/09",status:1},{title:" 7/10",status:0},{title:" 7/11",status:1},{title:" 7/12",status:1},{title:" 7/13",status:1},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:1},{title:" 7/17",status:1},]},
    {id:"8",fullName:'رضا غلامی',code:312123,day:[{title:" 7/01",status:1},{title:" 7/02",status:1},{title:" 7/03",status:1},{title:" 7/04",status:0},{title:" 7/04",status:2},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:1},{title:" 7/08",status:1},{title:" 7/09",status:1},{title:" 7/10",status:1},{title:" 7/11",status:1},{title:" 7/12",status:1},{title:" 7/13",status:1},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:1},{title:" 7/17",status:1},]},
    {id:"9",fullName:'قاسم قاسمی',code:678456,day:[{title:" 7/01",status:1},{title:" 7/02",status:2},{title:" 7/03",status:1},{title:" 7/04",status:1},{title:" 7/04",status:2},{title:" 7/05",status:1},{title:" 7/06",status:1},{title:" 7/07",status:1},{title:" 7/08",status:2},{title:" 7/09",status:1},{title:" 7/10",status:1},{title:" 7/11",status:0},{title:" 7/12",status:2},{title:" 7/13",status:0},{title:" 7/14",status:1},{title:" 7/15",status:1},{title:" 7/16",status:1},{title:" 7/17",status:1},]}
   ]

   routeSub: Subscription;
   routerEventsSub: Subscription;
   columns:any[]=[];
   title:string="";
   isBillMaterial:boolean = true;
   checkShowColumn() {
    this.columns = [
      { dataField: "id", alignment: "right", caption: this.translate.instant('id'), width: 80, visible: false },
      { dataField: "code", alignment: "center", caption: 'کد' },
      { dataField: "fullName", alignment: "center", caption: 'نام و نام خانوداگی' }
    ];
  

    if (this.datasource.length > 0) {
      const days = this.datasource[0].day;
      days.forEach((d, index) => {
        this.columns.push({
          caption: d.title,
          dataField: `day${index}`, // یک فیلد موقت برای اتصال به rowData
          alignment: "center",
          calculateCellValue: (rowData: any) => rowData.day[index]?.status,
          cellTemplate: 'stickerCell',
          isStiker: true,
        });
      });
    }
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
      this.returnUrlAddress = '/index-info';
    }

    updateWarehouseType(type: string) {
      if (type === "material") {
        this.titlelist = 'لیست انبار مواد اولیه';
        this.isBillMaterial = true;
      } else if (type === "produce") {
        this.titlelist = 'لیست موجودی محصولات';
        this.isBillMaterial = false;
      } else {
        this.titlelist = 'وضعیت حضور و غیاب';
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
  // private get(){
  //   // if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Warehouse_Detail)){
  //   //   return ;
  //   // }
  //   this.crudService.getDataUrl(this.baseUrlApi, `GetWarehouseByFactor`).subscribe(res=>{
  //     this.datasource = res ;     

      
  //   },
  //   error =>{
  //     this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
  //   });
  // }  
  private get() {
    this.datasource = this.res; // دیتا بدون تغییر
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
