import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import { Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { ClassStudentDto as StudentClassInfoDto } from 'app/class-module/models/class-student.dto';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';

@Component({
  selector: 'app-class-student-list',
  templateUrl: './class-student-list.component.html',
})
export class ClassStudentListComponent implements OnInit, OnChanges {


  @Input()
  classInfoId:number =0;

  @Input()
  isupdatemodel:boolean | undefined;
  
  _isRefresh: boolean;
  get isRefresh():any {
    return this._isRefresh;
  }
  @Input() set isRefresh(value: any) {
      this._isRefresh = value;
      this.getData();
  }
  @Output() isRefreshChange :EventEmitter<boolean> = new EventEmitter<any>();
  


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isupdatemodel']) {
      this.getData();
      this.isupdatemodel=false
    }
  }
  

  datasource: StudentClassInfoDto[] = [];
  model: StudentClassInfoDto;
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

    this.model = new StudentClassInfoDto(0);
    this.baseUrlApi = Globals.UrlStudentClassInfo;
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
      dataField: "code",
      alignment: "center",
      caption: 'کد دانش آموز'
    },
    {
      dataField: "fullName",
      alignment: "center",
      caption: 'دانش آموز',
    },    
    {
      dataField: "fatherName",
      alignment: "center",
      caption: 'نام پدر',
    },            
    {
      dataField: "nationalCode",
      alignment: "center",
      caption: 'کد ملی',
    }];


  // openDialogForm(dataModel: StudentClassInfoDto) {
  //   const activeModal = this.modalService.open(ClassStudentFormComponent);
  //   activeModal.componentInstance.model = Object.assign({},dataModel);
  //   activeModal.componentInstance.OnRefreshList.subscribe(res=>{
  //     if(res){        
  //       this.getData();
  //     }
  //   });
  // }


  // onAdd() {
  //   const activeModal = this.modalService.open(ClassStudentFormComponent);
  //   activeModal.componentInstance.OnRefreshList.subscribe(res=>{
  //     if(res){        
  //       this.getData();
  //     }
  //   });
  // }

 


  // onPresentForm(model){
  //   //this.onPresent(model);
  // }

  titlelist: string = '';
  ngOnInit() {
    this.getData();
  }

  dataList:any[]=[];
  dataListCount:any[]=[];
  getData(){
    
    this.crudService.getDataUrl(this.baseUrlApi, `GetInclude/${this.classInfoId}`).subscribe(res=>{
      this.datasource = res;
    });
  }

  actions: ActionTypes = new ActionTypes({}, 
                                           { isShow: false, icon: 'feather-edit btn-edit', title:this.translate.instant('edit') }, 
                                           { isShow: true, icon: 'feather-trash btn-delete', title:this.translate.instant('delete')}, 
                                           { }, 
                                           { }, 
                                           { }, 
                                           {});


onUpdate(item:StudentClassInfoDto){
}

onDeleteConfirm(item:number) {
      let id = item;
      this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){

      this.crudService.deleteById(Globals.UrlStudentClassInfo, id).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('deleted-is-successfully'))
            this.getData();
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
  
  // actionTop: ActionType[] = [{ isShow: true, title:'حضور فوری', icon: ActionIcon.Tick },
  //                             { isShow: true, title:'حضور فرم', icon: ActionIcon.Plus }
  // ]
  // onActionTopResult(index) {
  //   switch (index) {
  //     case 0:
  //       this.onAdd();
  //       break;
  //   }
  // }

  // actionList: ActionType[] = [{ isShow: true, title:'حذف کلاس', icon: ActionIcon.Delete, level: ActionColor.Danger },
  //                             { isShow: true, title:'ویرایش کلاس', icon: ActionIcon.Edit, level: ActionColor.Primary },
  //                             { isShow: true, title:'ساعات کلاس', icon: ActionIcon.Timer, level: ActionColor.Primary },
  //                             { isShow: true, title:'مشاهده لیست کلاس', icon: ActionIcon.Users, level: ActionColor.Primary },
  // ];

  // onActionResult(data: IActionEmitter) {
  //   debugger;
  //   switch (data.index) {      
  //     case 0:
  //       this.onPresent(data.data);
  //       break;
  //     case 1:
  //       this.openDialogForm(data.data);
  //       break;
  //     case 2:
  //       this.openDialogForm(data.data);
  //       break;
  //     case 3:
  //       this.openDialogForm(data.data);
  //       break;
  //   }
  // }

  // statusValue:any = 0;
  // size:any = 10;
  // page:any = 1;
  // searchValue:string ="";
  // gotoNextPage(data:State){
  //   debugger;
  //   this.page = data.page ;
  //   this.size = data.pageSize;
  //   this.searchValue = data.searchTerm;
  //   this.getData();
  // }


}
