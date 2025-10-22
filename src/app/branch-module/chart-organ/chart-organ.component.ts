import { Component, OnInit } from '@angular/core';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { ChartOrganDto } from '../models/chart-organ.dto';
import { ChartOrganFormComponent } from './chart-organ-form/chart-organ-form.component';
import { ChartOrganDiagramViewComponent } from './chart-organ-diagram-view/chart-organ-diagram-view.component';

@Component({
  selector: 'app-chart-organ',
  templateUrl: './chart-organ.component.html',
})
export class ChartOrganComponent implements OnInit {

  datasource : ChartOrganDto[]=[];
  datasourceFull : ChartOrganDto[]=[];
  model : ChartOrganDto;
  accessItem :AccessItemDto;
  private baseUrlApi : string = "";
    constructor(
        public tranlate: TranslateService,
    private crudService: BaseCrudService,
    private router : Router,
    private modalService:MatDialog,
    private accessKeywordService:AccessKeywordService,
    private activateRoute: ActivatedRoute,
    public splashScreenService: LoadingSplashScreenService,
    private translate: TranslateService,
    private toastMessageService: ToastMessageService ) {
      this.model = new ChartOrganDto(0);
      this.baseUrlApi = Globals.UrlChartOrgan;
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
        }
  
        if (event instanceof NavigationEnd) {
          let id = this.activateRoute.snapshot.params['id'];
          if (id !== undefined && id > 0) {
            this.idParentCategory = id; 
            this.get(id);
          }else{
            this.get(0);
          }
        }
  
        if (event instanceof NavigationError) {
             // Hide progress spinner or progress bar
            // Present error to user
             
        }
    });

   }

   actions:ActionTypes = new ActionTypes({},{isShow:true, icon:'feather-edit btn-edit',title:this.translate.instant('edit')},
                                            {isShow:true, icon:'feather-trash btn-delete',title: this.translate.instant('delete')}, 
                                            {isShow:true, icon:'feather-sliders btn-detail',title: this.translate.instant('accounting-sub-accounts')}, {}, {}, {});
   columns = [            
    {
      dataField: "picUrlAvatar",
      caption:this.translate.instant('photo'),
      cellTemplate:'photoCellTemplate',
      width:100,
    },
    {
      caption:this.translate.instant('operation'),
      width:150,
      cellTemplate:'actionCellTemplate',
    },
    {
      dataField:"postTitle",
      alignment:"center",
      caption:this.translate.instant('position'),
    },         
    {
      dataField:"fullName",
      alignment:"center",
      caption:this.translate.instant('name'),
    },
    {
      dataField:"parent.postTitle",
      alignment:"center",
      caption:"parent",
    },
    {
      dataField:"description",
      alignment:"center",
      caption:this.translate.instant('description'),
    }];

  

    openDialogForm(dataModel?:ChartOrganDto) {
       
      if(this.idParentCategory>0){
        const activeModal = this.modalService.open(ChartOrganFormComponent);
        activeModal.componentInstance.model = Object.assign({},  dataModel);
        activeModal.componentInstance.parentId = this.idParentCategory;
        activeModal.afterClosed().subscribe(()=>{
          this.get(this.idParentCategory);
        })
      }else if(this.idParentCategory==0 && dataModel !==null){
        const activeModal = this.modalService.open(ChartOrganFormComponent);
        activeModal.componentInstance.model = Object.assign({},  dataModel);
        activeModal.componentInstance.parentId = this.idParentCategory;
        activeModal.afterClosed().subscribe(()=>{
          this.get(this.idParentCategory);
        })
      }
      else{
        const activeModal = this.modalService.open(ChartOrganDiagramViewComponent);
        activeModal.componentInstance.dataSource = this.datasourceFull;
      }
    }


  listTitle:string='';
  btnTitle: string ="";
  returnUrlAddress:string ='';
  idParentCategory:number =0;
  ngOnInit() {
    this.listTitle =this.translate.instant('organizational-chart');
    if(this.idParentCategory==0){
      this.btnTitle =this.translate.instant('display-organizational-chart');
    }else{
      this.btnTitle =this.translate.instant('add2');
    }
     this.returnUrlAddress = 'branch/chart-organ';
     let id = this.activateRoute.snapshot.params['id'];
     if (id == undefined || id == 0) {
      //this.get(0);
     }    

     this.getFullChart();
  }

  onDeleteConfirm(id:number) {
    // if(!this.accessKeywordService.checkAccessDelete(AccessKeyword.ACCKEY_Currency) ){
    //   this.toastMessageService.showToast(NbToastStatus.WARNING, "پیام" , "شما دسترسی به حذف ندارید")
    //   return;
    // }



    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){
        this.splashScreenService.show();

      this.crudService.deleteById(this.baseUrlApi , id).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success Message " , "Deleted is Successfully!")
            this.get(this.idParentCategory);
          }
          else{
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Error Message " , "Error operation")
          }
      },
      error =>{
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error'), error.Message);
    },() => {
      this.splashScreenService.hide();
    });
    } });
  }

  OnUpdate(item : ChartOrganDto) {     
    if(this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Currency) ){            
      this.openDialogForm(item);
    }else{
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-receiving-information'), this.translate.instant('you-do-not-have-access-to-edit-the-record') );
    }
  }

  onDetail(item : ChartOrganDto) {     
    if(this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Currency) ){            
      this.router.navigateByUrl(`/branch/chart-sub-organ/${item.id}`)
    }else{
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-receiving-information'), this.translate.instant('you-do-not-have-access-to-edit-the-record') );
    }
  }




  get(id:number){
    // if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Currency) ){
    //   return ;
    // }
    this.splashScreenService.show();
    this.crudService.getDataUrl(this.baseUrlApi, `GetInclude/${id}`).subscribe(res=>{
      this.splashScreenService.hide();
      this.datasource = res ;     
    },
    error =>{
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error'), error.Message);
    });
  }


  getFullChart(){
    // if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Currency) ){
    //   return ;
    // }
    this.splashScreenService.show();
    this.crudService.getDataUrl(this.baseUrlApi, `GetFull`).subscribe(res=>{
      this.splashScreenService.hide();
      this.datasourceFull = res ;     
    },
    error =>{
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error'), error.Message);
    });
  }

}
