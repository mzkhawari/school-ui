import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../common-service/service/base-crud.service';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchDto } from '../models/branch.dto';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionTypes } from 'app/common-module/common-component-grid-material/models/app-grid-action-type';
import { BranchUserDto } from '../models/branch-user.dto';
import { BranchUserFormComponent } from './branch-user-form/branch-user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-user',
  templateUrl: './branch-user.component.html',
})
export class BranchUserComponent implements OnInit {

  datasource: BranchUserDto[] = [];
  model: BranchUserDto;
  accessItem: AccessItemDto;
  private baseUrlApi: string = "";
  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    private router: Router,
    private modalService:MatDialog,
    private activateRoute:ActivatedRoute,
    private accessKeywordService: AccessKeywordService,
    public splashScreenService: LoadingSplashScreenService,
    private toastMessageService: ToastMessageService) {
    this.model = new BranchDto(0);
    this.baseUrlApi = Globals.UrlBranchUser;
  }

  actions: ActionTypes = new ActionTypes({}, 
                { isShow: true, icon: 'feather-edit btn-edit', title:this.translate.instant('edit')},
                { isShow: true, icon: 'feather-trash btn-delete', title:this.translate.instant('delete')}, {}, {}, {});
  columns = [
    {
      caption: this.translate.instant('operation'),
      width: 150,
      cellTemplate: 'actionCellTemplate',
      fixed: "true",
      fixedPosition: "right",
    },
    {
      dataField: "id",
      alignment: "right",
      caption: " Identity ",
      sortOrder: "desc",
      width: 80,
      visible: false
    },
    {
      dataField: "user.fullName",
      alignment: "center",
      caption:this.translate.instant('branch-users'),// this.tranlate.instant('sarafi.branch.list.user'),
    },
    {
      dataField:"branch.title",
      alignment:"center",
      caption:this.translate.instant('branch'), // this.tranlate.instant('sarafi.branch.list.city'),
    },    
    {
      dataField: "isActive",
      alignment: "center",
      caption: this.translate.instant('active/inactive'),
      width: 120,
    }];



  openDialogForm(dataModel?: BranchDto) {
  
    const activeModal = this.modalService.open(BranchUserFormComponent);
    activeModal.componentInstance.branchId = this.idBranch ;// dataModel.id Object.assign({},  dataModel);    
    activeModal.afterClosed().subscribe(res=>{
      this.get(this.idBranch);
    })
  }
  listTitle: string = ''
  returnUrlAddress:string='';
  idBranch:number =0;
  ngOnInit() {
    this.listTitle = this.translate.instant('branch-users');// this.tranlate.instant('sarafi.branch.list.header-title')

    this.returnUrlAddress = 'branch/branches';
    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      this.idBranch = id; 
      this.get(id);
    }else{
      this.model.isActive = true;
    }
  }

  onDeleteConfirm(id: number) {
    if (!this.accessKeywordService.checkAccessDelete(AccessKeyword.ACCKEY_Branch)) {
      this.toastMessageService.showToast(NbToastStatus.WARNING, this.translate.instant('message2'),this.translate.instant('you-do-not-have-access-to-delete'))
      return;
    }



    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.splashScreenService.show();

        this.crudService.deleteById(this.baseUrlApi, id).subscribe(res => {
          if (res) {
            this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success Message ", "Deleted is Successfully!")
            this.get(this.idBranch);
          }
          else {
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Error Message ", "Error operation")
          }
        },
          error => {
            this.splashScreenService.hide();
            this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
          }, () => {
            this.splashScreenService.hide();
            this.get(this.idBranch);
          });
      }
    });
  }

  OnUpdate(item: BranchDto) {
    if (this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Branch)) {
      this.openDialogForm(item);
    } else {
      this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('access-error'),this.translate.instant('you-do-not-have-access-to-edit-the-record'));
    }
  }


  onDetail(item: BranchUserDto) {


  }


  get(id:number) {
    if (!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_Branch)) {
      return;
    }
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlBranchUser, `getInclude/${id}`).subscribe(res => {
      this.splashScreenService.hide();
      this.datasource = res;
      if(this.datasource.length > 0){
        this.listTitle = `${this.translate.instant('branch-users')}  ${ this.datasource[0].branch.title}`
      }
    },
      error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
      });
  }

}
