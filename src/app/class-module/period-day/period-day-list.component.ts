import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import { Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassTimeDto } from '../models/class-time.dto';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { PeriodDayFormComponent } from './period-day-form/period-day-form.component';
import { PeriodDayDto } from '../models/priod-day.dto';

@Component({
  selector: 'app-period-day-list',
  templateUrl: './period-day-list.component.html',
})
export class PeriodDayListComponent implements OnInit ,  OnChanges {


  @Input()
  periodId:number =0;

  @Output()  
  OnEditModel: EventEmitter<PeriodDayDto> =  new EventEmitter();

  @Input()
  isupdatemodel:boolean | undefined;


  datasource: ClassTimeDto[] = [];
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
    this.baseUrlApi = Globals.UrlPeriodDay;
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
      dataField: "title",
      alignment: "center",
      caption: 'عنوان',
    },
    {
      dataField: "dateOfClassFa",
      alignment: "center",
      caption: 'تاریخ',
    },    
    {
      dataField: "hourFrom",
      alignment: "center",
      caption: 'از ساعت'
    },
    {
      dataField: "hourTo",
      alignment: "center",
      caption: 'تا ساعت',
    }];


  openDialogForm(dataModel: ClassTimeDto) {
    const activeModal = this.modalService.open(PeriodDayFormComponent);
    activeModal.componentInstance.model = Object.assign({},dataModel);
    activeModal.componentInstance.OnRefreshList.subscribe(res=>{
      if(res){        
        this.getData();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isupdatemodel']) {
      this.getData();
      this.isupdatemodel=false
    }
  }
  onPrint(modelItem) {
  }

  onAdd() {
    const activeModal = this.modalService.open(PeriodDayFormComponent);
    activeModal.componentInstance.OnRefreshList.subscribe(res=>{
      if(res){        
        this.getData();
      }
    });
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
    this.titlelist = "لیست ساعت کلاس "; // this.translate.instant('list-of-real-customers');
    this.getData();
  }





  dataList:any[]=[];
  dataListCount:any[]=[];
  getData(){
    this.crudService.getDataUrl(this.baseUrlApi, `GetInclude/${this.periodId}`).subscribe(res=>{
    this.datasource = res;
      this.titlelist = `ساعت کلاس ها (${this.datasource.length})`
    });
  }

  actions: ActionTypes = new ActionTypes(  { }, 
                                           { isShow: true, icon: 'feather-edit btn-edit', title:this.translate.instant('edit') }, 
                                           { isShow: true, icon: 'feather-trash btn-delete', title:this.translate.instant('delete')}, 
                                           { }, 
                                           { }, 
                                           { }, 
                                           {});


onUpdate(item:PeriodDayDto){
  this.OnEditModel.next(item);
}
onDeleteConfirm(item:number) {
      let id = item;
      this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){

      this.crudService.deleteById(Globals.UrlPeriodDay, id).subscribe(res=>{
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
