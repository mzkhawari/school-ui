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
import { StudentDto } from '../models/student.dto';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {

  datasource: StudentDto[] = [];
  datasourceCompany: StudentDto[] = [];
  model: StudentDto;
  accessItem: AccessItemDto;
  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private router: Router,
    private accessKeywordService: AccessKeywordService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.model = new StudentDto(0);
    this.baseUrlApi = Globals.UrlApplicant;
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
    // {
    //   dataField: "picUrlAvatarThumb",
    //   title: this.translate.instant('picture'),
    //   cellTemplate: 'photoCellTemplate',
    //   width: 100,
    // },  
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
    // {
    //   dataField: "firstName",
    //   alignment: "center",
    //   title: 'نام'
    // },
    // {
    //   dataField: "lastName",
    //   alignment: "center",
    //   title: 'نام خانوادگی',
    // },
    {
      dataField: "fullName",
      alignment: "center",
      title: 'نام کامل'
    },
    {
      dataField: "fatherName",
      alignment: "center",
      title: 'نام پدر',
    },    
    {
      dataField: "nationalCode",
      alignment: "center",
      title: 'کد ملی',
    },
    {
      dataField: "nationality",
      alignment: "center",
      title: 'ملیت',
    },
    {
      dataField: "cellPhone",
      alignment: "center",
      title: 'همراه',
    },
    {
      dataField: "cellPhoneEitaa",
      alignment: "center",
      title: 'همراه در ایتا',
    },
    {
      dataField: "brithDate",
      alignment: "center",
      title: 'تاریخ تولد',
    },
    {
      dataField: "address",
      alignment: "center",
      title: 'آدرس',
    }
  ];


  openDialogForm(dataModel?: StudentDto) {
    if (dataModel !== undefined && dataModel !== null) {
      this.router.navigateByUrl(`/account/account/${dataModel.id}`);
    } else {
      this.router.navigateByUrl('/account/account/add');
    }
  }

  onPrint(modelItem) {
    //activeModal.componentInstance.model = modelItem;// Object.assign({},  modelItem);
  }




 


  onPresentForm(model){
    this.onPresent(model);
  }

  onPresent(model){
    
    let modelPresent ={
      id:0,
      DateIn : new Date(),
      ApplicantId:model.id,
      ByMFather:false,
      ByMother:false,
      ByOther:false,
    }


        this.crudService.postDataUrl(`${Globals.UrlApplicantPersent}`, 'PostValue' , modelPresent).subscribe(res => {
            if (res ==  true) {
              this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "با موفقیت ثبت شد")
            } else if (res ==  false) {
              this.toastMessageService.showToast(NbToastStatus.WARNING, "Warning", "قبلا ثبت شده است")
            }else{
              this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning", res)
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
    this.titlelist = "لیست دانش آموزان "; // this.translate.instant('list-of-real-customers');
    this.getData();
  }





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
    this.crudService.getDataUrl(this.baseUrlApi, `GetIncludeByPaging/${this.size}/${this.page}/${this.statusTrn}/${this.searchValue.replace('/','-').replace('/','-')}/${(new Date().getTime())}`).subscribe(res=>{
      this.dataList = res.data;
      this.dataListCount = res.count; 
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
