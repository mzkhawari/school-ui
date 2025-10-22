import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { TranslateService } from '@ngx-translate/core';
import { State } from 'app/shared-grid/app-grid/IState';
import { IActionEmitter } from 'app/shared-grid/models/action-emitter';
import { ActionIcon } from 'app/shared-grid/models/action-icon';
import { ActionColor } from 'app/shared-grid/models/action-color';
import { ActionType } from 'app/shared-grid/models/action-type';
import { MatDialog } from '@angular/material/dialog';
import { PeriodDto } from '../models/priod.dto';
import { PeriodFormComponent } from './period-form/period-form.component';
import { PeriodDayFormComponent } from '../period-day/period-day-form/period-day-form.component';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
})
export class PeriodListComponent implements OnInit {

  datasource: PeriodDto[] = [];
  model: PeriodDto;
  accessItem: AccessItemDto;
  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private router: Router,
    private accessKeywordService: AccessKeywordService,
    public splashScreenService: LoadingSplashScreenService,
    private modalService: MatDialog, 
    private toastMessageService: ToastMessageService) {

    this.model = new PeriodDto(0);
    this.baseUrlApi = Globals.UrlPeriod;
  }
  statusTrn:number=0;
  isBorderButton:number=0;  

  statusButton(res){
    this.statusTrn=res;
    this.getData()
    this.isBorderButton=res;   
  }

  
  columns = [
    {
      dataField: "id",
      alignment: "right",
      title: " Identity ",
      sortOrder: "desc",
      width: 80,
      visible: false
    },
    {
      dataField: "title",
      alignment: "center",
      title: 'عنوان',
    },
    {
      dataField: "description",
      alignment: "center",
      title: 'توضیحات'
    },
    {
      dataField: "isActive",
      alignment: "center",
      title: 'فعال/ غیرفعال',
    },    
    {
      dataField: "isSatarday",
      alignment: "center",
      title: 'شنبه ها',
    },    
    {
      dataField: "isSunday",
      alignment: "center",
      title: 'یکشنبه ها',
    },    
    {
      dataField: "isMonday",
      alignment: "center",
      title: ' دوشنبه ها',
    },
    {
      dataField: "isTuseday",
      alignment: "center",
      title: 'سه شنبه ها',
    },    
    {
      dataField: "isWedesday",
      alignment: "center",
      title: 'چهارشنبه ها',
    } ,   
    {
      dataField: "isThursday",
      alignment: "center",
      title: 'پنج شنبه ها',
    },    
    {
      dataField: "isFirday",
      alignment: "center",
      title: 'جمعه ها',
    }    
  ];


  onUpdate(item:any) {
    const activeModal = this.modalService.open(PeriodFormComponent);
    activeModal.componentInstance.model = Object.assign({},item);
    activeModal.afterClosed().subscribe(res=>{
      this.getData();
    });
  }

  onAdd() {
    const activeModal = this.modalService.open(PeriodFormComponent);
    activeModal.afterClosed().subscribe(res=>{
      this.getData();
    });
  }

 


  onPresentForm(model){
    //this.onPresent(model);
  }

  onPresent(model){
    return;

      
  }

  titlelist: string = '';
  ngOnInit() {
    this.titlelist = "لیست دوره های زمانی "; // this.translate.instant('list-of-real-customers');
    this.getData();
  }





  dataList:any[]=[];
  dataListCount:any[]=[];
  getData(){
    debugger;
    if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Period) ){
      return ;
    }
    if(this.searchValue==''){
      this.searchValue = '0';
    }
    this.crudService.getDataUrl(this.baseUrlApi, `GetIncludeByPaging/${this.size}/${this.page}/${this.statusTrn}/${this.searchValue.replace('/','-').replace('/','-')}/${(new Date().getTime())}`).subscribe(res=>{
      this.dataList = res.data;
      this.dataListCount = res.count; 
      this.titlelist = `دوره های زمانی (${this.dataListCount})`
    });
  }

  openClassTime(dataModel: PeriodDto) {
      const activeModal = this.modalService.open(PeriodDayFormComponent);
      activeModal.componentInstance.periodId = dataModel.id;
      activeModal.afterClosed().subscribe(res=>{
        this.getData();
      });
    }



  
  actionList: ActionType[] = [{ isShow: true, title:'ویرایش ', icon: ActionIcon.Edit, level: ActionColor.Success },
                              { isShow: true, title:'روزهای دوره', icon: ActionIcon.Timer, level: ActionColor.Primary },
                              { isShow: true, title:'حذف کردن', icon: ActionIcon.Delete, level: ActionColor.Danger },
                            ];

  onActionResult(data: IActionEmitter) {
    debugger;
    switch (data.index) {      
      case 0:
        this.onUpdate(data.data);
        break;
      case 1:
        this.openClassTime(data.data);
        break;

      case 2:
        this.onDeleteConfirm(data.data);
        break;


    }
  }


  onDeleteConfirm(item:PeriodDto) {
      let id = item.id;
      this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){
          this.crudService.deleteById(Globals.UrlPeriod, id).subscribe(res=>{
            if(res){
              this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('deleted-is-successfully'))
            }
            else{
              this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'), this.translate.instant('encountered-an-error'))
            }
          },
          error =>{
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
          },() => {

          });
      } 
    });
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
