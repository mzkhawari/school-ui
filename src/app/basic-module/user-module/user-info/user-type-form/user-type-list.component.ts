import { Component, Input, OnInit } from '@angular/core';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import { Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { State } from 'app/shared-grid/app-grid/IState';
import { IActionEmitter } from 'app/shared-grid/models/action-emitter';
import { ActionIcon } from 'app/shared-grid/models/action-icon';
import { ActionColor } from 'app/shared-grid/models/action-color';
import { ActionType } from 'app/shared-grid/models/action-type';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';

@Component({
  selector: 'app-user-type-list',
  templateUrl: './user-type-list.component.html',
})
export class UserTypeListComponent implements OnInit {


  @Input()
  userId:number =0;
  datasource: any[] = [];
  model: any;
  accessItem: AccessItemDto;
  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService) {
    this.baseUrlApi = Globals.UrlUserTypeUser;
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
      caption:this.translate.instant('operation'),
      width:75,
      cellTemplate:'actionCellTemplate',
    },
    {
      dataField: "id",
      alignment: "right",
      title: " Identity ",
      sortOrder: "desc",
      width: 80,
      visible:false,
    },   
    {
      dataField: "userTypeTitle",
      alignment: "center",
      caption: 'نقش کاربری',
    },
    {
      dataField: "userFullName",
      alignment: "center",
      caption: 'کاربر',
    }];


  

  onPrint(modelItem) {
  }

  onAdd() {
    // const activeModal = this.modalService.open(PeriodDayFormComponent);
    // activeModal.componentInstance.OnRefreshList.subscribe(res=>{
    //   if(res){        
    //     this.getData();
    //   }
    // });
  }

 


  onPresentForm(model){
    //this.onPresent(model);
  }

  titlelist: string = '';
  ngOnInit() {
    this.titlelist = "لیست ساعت کلاس "; // this.translate.instant('list-of-real-customers');
    this.getData();
  }





  dataList:any[]=[];
  dataListCount:any[]=[];
  getData(){
    this.crudService.getDataUrl(this.baseUrlApi, `GetInclude/${this.userId}`).subscribe(res=>{
    this.datasource = res;
    });
  }

  actions: ActionTypes = new ActionTypes(  { }, 
                                           { isShow: true, icon: 'feather-edit btn-edit', title:this.translate.instant('edit') }, 
                                           { isShow: true, icon: 'feather-trash btn-delete', title:this.translate.instant('delete')}, 
                                           { }, 
                                           { }, 
                                           { }, 
                                           {});


  onDelete(item:any){

  }
  onUpdate(item:any){

  }

  
  actionTop: ActionType[] = [{ isShow: true, title:'حضور فوری', icon: ActionIcon.Tick },
                              { isShow: true, title:'حضور فرم', icon: ActionIcon.Plus }
  ]
  onActionTopResult(index) {
    switch (index) {
      case 0:
        this.onAdd();
        break;
    }
  }

  actionList: ActionType[] = [{ isShow: true, title:'حذف کلاس', icon: ActionIcon.Delete, level: ActionColor.Danger },
                              { isShow: true, title:'ویرایش کلاس', icon: ActionIcon.Edit, level: ActionColor.Primary },
                              { isShow: true, title:'ساعات کلاس', icon: ActionIcon.Timer, level: ActionColor.Primary },
                              { isShow: true, title:'مشاهده لیست کلاس', icon: ActionIcon.Users, level: ActionColor.Primary },
  ];

  onActionResult(data: IActionEmitter) {
    debugger;
    switch (data.index) {      
      case 0:
        ////this.onPresent(data.data);
        break;
      case 1:
        //this.openDialogForm(data.data);
        break;
      case 2:
        //this.openDialogForm(data.data);
        break;
      case 3:
        //this.openDialogForm(data.data);
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
