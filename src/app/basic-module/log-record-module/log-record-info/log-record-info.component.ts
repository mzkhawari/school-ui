import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';

import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { MatDialog } from '@angular/material/dialog';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import { AuthenticateService } from 'app/common-service/security-service/Authenticate.service';
import { TranslateService } from '@ngx-translate/core';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { State } from 'app/shared-grid/app-grid/IState';
import { ActionIcon } from 'app/shared-grid/models/action-icon';
import { ActionColor } from 'app/shared-grid/models/action-color';
import { ActionType } from 'app/shared-grid/models/action-type';
import { IActionEmitter } from 'app/shared-grid/models/action-emitter';
import { Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { AccountDto } from 'app/student-module/models/account.dto';


@Component({
  selector: 'log-record-info',
  templateUrl: './log-record-info.component.html',
})
export class LogRecordInfoComponent implements OnInit {

  
  datasource : any[]=[];
  model : any;
  accessItem :AccessItemDto;
  private roles : UserRoleDto[]=[];
  private baseUrlApi : string = "";
    constructor(
       private router: Router,
        public translate: TranslateService,
    private crudService: BaseCrudService,
    private modalService: MatDialog,
    public loading: LoadingSplashScreenService,
    private accessKeywordService:AccessKeywordService,
    private authService:AuthenticateService,
    private toastMessageService: ToastMessageService ) {
      this.model = new UserDto(0);
      this.baseUrlApi = Globals.UrlLogRecord ;
      
   }

   columns = [          
     {
      dataField:"id", 
        alignment:"right", 
        title:this.translate.instant('id'),
        sortOrder:"desc",
        width:80,
        visible: false,
    },        
    {
      dataField:"description",
        alignment:"center",
        title:this.translate.instant('description'),
    },   
    {
      dataField:"rowId",
      alignment:"center",
      title:this.translate.instant('record-id'),
    },        
    {
      dataField:"tableName",
      alignment:"center",
      title: "جدول داده",
    },
    {
      dataField:"createDateFa",
      alignment:"center",
      title: "تاریخ ایجاد",
    },
    {
      dataField:"createUserTitle",
      alignment:"center",
      title: "ایجاد کننده",
    },
    {
      dataField:"typeAction",
      alignment:"center",
      title:this.translate.instant('operation-type'),
    }];

      dataList:any[]=[];
      dataListCount:any[]=[];
      getData(){
        debugger;
        if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Account) ){
          return ;
        }
        if(this.searchValue==''){
          this.searchValue = '0';
        }
        this.loading.show();
        this.crudService.getDataUrl(this.baseUrlApi, `GetIncludeByPaging/${this.size}/${this.page}/${this.searchValue.replace('/','-').replace('/','-')}/${(new Date().getTime())}`).subscribe(res=>{
          this.dataList = res.data;
          this.dataListCount = res.count; 
          this.loading.hide();
        },
        ()=>{
          this.loading.hide();
        });
      }

      
        actionList: ActionType[] = [{ isShow: true, title: "نمایش جزئیات داده ها" , icon: ActionIcon.View, level: ActionColor.Success },                              
                                    { isShow: true, title: "بازیابی داده ها", icon: ActionIcon.Sliders, level: ActionColor.Primary }];
  
openDialogForm(dataModel?:UserDto) {
}
 
private getSelectOptions():any{
  return this.crudService.getDataUrl(Globals.UrlUser , "GetSelectOptions" );
}
    titlelist:string=''
    ngOnInit() {
        this.titlelist = this.translate.instant('list-of-changes-to-data-records');// this.translate.instant('user.header-title');
        //this.accessItem = new AccessItemDto(0, true, true, true, true, "");   // this.authService.checkAccess("User");
        // this.get();   
        this.getData(); 
  }

  onDeleteConfirm(id:number) {
    // if(!this.accessKeywordService.checkAccessDelete(AccessKeyword.ACCKEY_Branch_User) ){
    //   this.toastMessageService.showToast(NbToastStatus.WARNING, "پیام" , "شما دسترسی به حذف ندارید")
    //   return;
    // }


    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){
         
      this.crudService.deleteById(this.baseUrlApi , id).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('deleted-is-successfully'))
            // this.get();
            this.getData(); 
          }
          else{
            this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'),this.translate.instant('encountered-an-error'))
          }
      },
      error =>{
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
    },() => {
      // this.get();
      this.getData(); 
    });
    } });
  }

  OnUpdate(item : UserDto) {     
    if(this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Branch_User) ){            
      this.openDialogForm(item);
    }else{
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('access-error'),this.translate.instant('you-do-not-have-access-to-edit-the-record'));
    }
  }

  get(){
    
    if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Branch_User) ){
      return ;
    }

    this.crudService.get(this.baseUrlApi).subscribe(res=>{
      this.datasource = res ;     
    },
    error =>{
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('server-error'), error.Message);
    });
  }
    onPrint(modelItem) {
      //const activeModal = this.modalService.open(AccountCardComponent);
      //activeModal.componentInstance.model = modelItem;// Object.assign({},  modelItem);
    }
    onDetail(model){
      this.router.navigateByUrl(`/report/report-transfer-cash-personly/${model.id}`);
    }
     OnUpdateSupporter(item: AccountDto) {
        // const activeModal = this.modalService.open(CustomerInfoFormComponent);
        // activeModal.componentInstance.model = Object.assign({},  item.supperter);
        // activeModal.componentInstance.accountId = item.id;
        // activeModal.componentInstance.titleMain =this.translate.instant('sponsor');
        // activeModal.componentInstance.customerTypeId =4;
        // activeModal.afterClosed().subscribe(()=>{
        //   this.getData();
        // })        
       
      }
  onActionResult(data: IActionEmitter) {
    debugger;
    switch (data.index) {      
      case 0:  
        this.onDeleteConfirm(data.data);        
        break;      
      case 1:
        this.onPrint(data.data);        
        break;      
      case 2:
        this.onDetail(data.data);
        break;
      case 3:
        this.OnUpdateSupporter(data.data);
        break;
      case 4:
        this.OnUpdate(data.data);
        break;
    }
  }

    statusValue:any = 0;
    size:any = 10;
    page:any = 1;
    searchValue:string ="";
    gotoNextPage(data:State){
      debugger;
      this.page = data.page ;
      this.size = data.pageSize;
      this.searchValue = data.searchTerm;
      this.getData();
    }

  
}
