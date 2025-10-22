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
import { StudentPresentDto } from '../models/student-present.dto';
import { MatDialog } from '@angular/material/dialog';
import { StudentPresentFormComponent } from './student-present-form/student-present-form.component';

@Component({
  selector: 'app-student-present',
  templateUrl: './student-present.component.html',
})
export class StudentPresentComponent implements OnInit {

  datasource: StudentPresentDto[] = [];
  model: StudentPresentDto;
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

    this.model = new StudentPresentDto(0);
    this.baseUrlApi = Globals.UrlApplicantPersent;
  }
  statusTrn:number=0;
  isBorderButton:number=0;  

  statusButton(res){
    this.statusTrn=res;
    this.getData()
    this.isBorderButton=res;   
  }

  actions: ActionTypes = new ActionTypes({}, 
                                         { isShow: true, icon: 'feather-edit btn-edit', title:this.translate.instant('edit') }, 
                                         { isShow: true, icon: 'feather-trash btn-delete', title:this.translate.instant('delete')}, 
                                         { isShow: true, icon: 'feather-eye btn-view', title:this.translate.instant('transaction-report')}, 
                                         { isShow:true, icon:'feather-user btn-detail',title:this.translate.instant('show/edit-sponsor')}, 
                                         { isShow: true, icon: 'feather-printer btn-printer', title:this.translate.instant('card-printing')}, 
                                         {});
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
      dataField: "applicantCode",
      alignment: "center",
      title: 'کد دانش آموز',
    },
    {
      dataField: "fullName",
      alignment: "center",
      title: 'نام کامل'
    },
    {
      dataField: "byMother",
      alignment: "center",
      title: 'همراه مادر',
    },    
    {
      dataField: "byFather",
      alignment: "center",
      title: 'همراه پدر',
    },    
    {
      dataField: "byOther",
      alignment: "center",
      title: 'همراه سایر',
    },    
    {
      dataField: "dateIn",
      alignment: "center",
      title: ' ورود',
    },
    {
      dataField: "dateOut",
      alignment: "center",
      title: 'خروج',
    }    
  ];


  openDialogForm(dataModel?: StudentPresentDto) {
    if (dataModel !== undefined && dataModel !== null) {
      this.router.navigateByUrl(`/account/account/${dataModel.id}`);
    } else {
      this.router.navigateByUrl('/account/account/add');
    }
  }

  onPrint(modelItem) {
  }

  onShowStudent() {
    const activeModal = this.modalService.open(StudentPresentFormComponent);
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
    if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Student_Persent) ){
      return ;
    }
    if(this.searchValue==''){
      this.searchValue = '0';
    }
    this.crudService.getDataUrl(this.baseUrlApi, `GetIncludeByPaging/${this.size}/${this.page}/${this.statusTrn}/${this.searchValue.replace('/','-').replace('/','-')}/${(new Date().getTime())}`).subscribe(res=>{
      this.dataList = res.data;
      this.dataListCount = res.count; 
      this.titlelist = `لیست دانش آموزان حاضر (${this.dataListCount})`
    });
  }



  
  actionTop: ActionType[] = [{ isShow: true, title:'حضور فوری', icon: ActionIcon.Tick },
                              { isShow: true, title:'حضور فرم', icon: ActionIcon.Plus }
  ]
  onActionTopResult(index) {
    switch (index) {
      case 0:
        this.openDialogForm();
        break;
    }
  }

  actionList: ActionType[] = [{ isShow: true, title:'حضور فوری', icon: ActionIcon.Tick, level: ActionColor.Success },
                              { isShow: true, title:'حضور فرم', icon: ActionIcon.View, level: ActionColor.Primary }
  ];

  onActionResult(data: IActionEmitter) {
    debugger;
    switch (data.index) {      
      case 0:
        this.onPresent(data.data);
        break;
      case 1:
        this.onPresentForm(data.data);
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
