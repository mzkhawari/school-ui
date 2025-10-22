import { Component, Input, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { Router } from '@angular/router';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { MatDialog } from '@angular/material/dialog';
import { AttachmentFileDto } from '../models/attachment-file.dto';
import { BranchDto } from 'app/branch-module/models/branch.dto';

@Component({
  selector: 'app-attachment-file',
  templateUrl: './attachment-file.component.html',
})
export class AttachmentFileComponent implements OnInit {

  @Input()
  relatedId :number =0;

  @Input()
  type :0|1|2|3 =0; // 1 account , 2 customer , 3 transaction

  datasource : AttachmentFileDto[]=[];
  model : AttachmentFileDto;
  accessItem :AccessItemDto;
    constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private router : Router,
    private accessKeywordService:AccessKeywordService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService ) {
      this.model = new BranchDto(0);
   }

   actions:ActionTypes = new ActionTypes({}, {}, {isShow:true, icon:'feather-trash btn-delete',title:this.translate.instant('delete-file')},
                                                 {isShow:true, icon:'feather-download btn-detail2',title:this.translate.instant('download-file')}, {}, {});
   columns = [            
   {
      caption:this.translate.instant('operation'),
      width:75,
      cellTemplate:'actionCellTemplate',
      fixed:"true",
      fixedPosition:"right",
   },    
   {
      dataField:"id", 
      alignment:"right", 
      caption:" Identity " ,
      sortOrder:"desc",
      width:80,
      visible:false
   },
   {
      dataField:"description",
      alignment:"center",
      caption: this.translate.instant('description'),
   },   
   {
      dataField:"createDateFa",
      alignment:"center",
      caption: this.translate.instant('date-added'),                  
      width:100,
    }];

    openDialogForm(dataModel?:BranchDto) {
      if(dataModel!==undefined && dataModel!==null){
        this.router.navigateByUrl(`/branch/branch/${dataModel.id}`);
      }else{
        this.router.navigateByUrl('/branch/branch/add');
      }
    }

  listTitle: string = ''
  ngOnInit() {
    this.listTitle = this.translate.instant('attachments');
    this.get();    
  }

  onDeleteConfirm(id:number) {
    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){
        this.splashScreenService.show();

      this.crudService.deleteById(Globals.UrlAttachmentFile , id).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success Message " , "Deleted is Successfully!")
            this.get();
          }
          else{
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Error Message " , "Error operation")
          }
      },
      error =>{
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
    },() => {
        this.splashScreenService.hide();
        this.get();
      });
    }});
  }

  OnUpdate(item : BranchDto) {     
    if(this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Branch) ){            
      this.openDialogForm(item);
    }else{
      this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('access-error'),this.translate.instant('you-do-not-have-access-to-edit-the-record'));
    }
  }

  onDetail(dataModel : AttachmentFileDto) {
    // const activeModal = this.modalService.open(AttachmentFileFormComponent);
    // activeModal.componentInstance.model = dataModel.fileUrl;    
    // activeModal.afterClosed().subscribe(res=>{
    // });
    window.open(dataModel.fileUrl, "_blank");
  }


  get(){
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlAttachmentFile, `getInclude/${this.type}/${this.relatedId}`).subscribe(res=>{
      this.splashScreenService.hide();
      this.datasource = res ;     
    },
    error =>{
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
    });
  }
}
