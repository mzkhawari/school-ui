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
import { ClassInfoDto } from '../models/class-info.dto';
import { ClassInfoFormComponent } from './class-info-form/class-info-form.component';
import { ClassTimeFormComponent } from '../class-time/class-time-form/class-time-form.component';
import { ClassStudentFormComponent } from './class-student/class-student-form/class-student-form.component';

@Component({
  selector: 'app-class-info-list',
  templateUrl: './class-info-list.component.html',
})
export class ClassInfoListComponent implements OnInit {

  datasource: ClassInfoDto[] = [];
  model: ClassInfoDto;
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

    this.model = new ClassInfoDto(0);
    this.baseUrlApi = Globals.UrlClassInfo;
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
      visible:false,
    },
    {
      dataField: "code",
      alignment: "center",
      title: 'کد',
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
      dataField: "periodTitle",
      alignment: "center",
      title: 'زمان',
    },    
    {
      dataField: "userFullName",
      alignment: "center",
      title: 'مبصر کلاس',
    },    
    ];


  openDialogForm(dataModel: ClassInfoDto) {
    const activeModal = this.modalService.open(ClassInfoFormComponent);
    activeModal.componentInstance.model = Object.assign({},dataModel);
    activeModal.componentInstance.OnRefreshList.subscribe(res=>{
      if(res){        
        this.getData();
      }
    });
  }

  openStudentForm(dataModel: ClassInfoDto) {
    const activeModal = this.modalService.open(ClassStudentFormComponent);
    activeModal.componentInstance.classInfoId = dataModel.id;//   = Object.assign({},dataModel);
    activeModal.componentInstance.OnRefreshList.subscribe(res=>{
      if(res){        
        this.getData();
      }
    });
  }

  openClassTime(dataModel: ClassInfoDto) {
    const activeModal = this.modalService.open(ClassTimeFormComponent);
    activeModal.componentInstance.classInfoId = dataModel.id;
    activeModal.componentInstance.OnRefreshList.subscribe(res=>{
      if(res){        
        this.getData();
      }
    });
  }

  onPrint(modelItem) {
  }

  onAdd() {
    const activeModal = this.modalService.open(ClassInfoFormComponent);
    activeModal.componentInstance.OnRefreshList.subscribe(res=>{
      if(res){        
        this.getData();
      }
    });
  }

 


  onPresentForm(model){
    //this.onPresent(model);
  }

  onPresent(model){
    return;

    let modelPresent ={
      id:0,
      DateIn : new Date(),
      ApplicantId:model.id,
      ByMFather:false,
      ByMother:false,
      ByOther:false,
    }


        this.crudService.postAdd(`${Globals.UrlApplicantPersent}`, modelPresent).subscribe(res => {
            if (res) {
              this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "با موفقیت ثبت شد")
            } else {
              this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
            }
          }, error => {
            this.splashScreenService.hide();
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
          },
          () => {
            this.splashScreenService.hide();            
          })
      
  }

  titlelist: string = '';
  ngOnInit() {
    this.titlelist = "لیست دانش آموزان حاضر "; // this.translate.instant('list-of-real-customers');
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
    //this.crudService.getInclude(this.baseUrlApi).subscribe(res=>{
    this.crudService.getDataUrl(this.baseUrlApi, `GetIncludeByPaging/${this.size}/${this.page}/${this.statusTrn}/${this.searchValue.replace('/','-').replace('/','-')}/${(new Date().getTime())}`).subscribe(res=>{
      this.dataList = res.data;
      this.dataListCount = res.count; 
      this.titlelist = `کلاس ها (${this.dataListCount})`
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

  actionList: ActionType[] = [{ isShow: true, title:'حذف کلاس', icon: ActionIcon.Delete, level: ActionColor.Danger },
                              { isShow: true, title:'ویرایش کلاس', icon: ActionIcon.Edit, level: ActionColor.Primary },
                              { isShow: true, title:'ساعات کلاس', icon: ActionIcon.Timer, level: ActionColor.Primary },
                              { isShow: true, title:'مشاهده لیست کلاس', icon: ActionIcon.Users, level: ActionColor.Primary },
  ];

  onActionResult(data: IActionEmitter) {
    debugger;
    switch (data.index) {      
      case 0:
        this.onDeleteConfirm(data.data);
        break;
      case 1:
        this.openDialogForm(data.data);
        break;
      case 2:
        this.openClassTime(data.data);
        break;
      case 3:
        this.openStudentForm(data.data);
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


  onDeleteConfirm(item:number) {
        let id = item;
        this.toastMessageService.confirmDelete().subscribe((result) => {
        console.log(result);
        if(result==='confirmed'){
  
        this.crudService.deleteById(Globals.UrlClassInfo, id).subscribe(res=>{
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





}
