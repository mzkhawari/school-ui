import { Component, OnInit } from '@angular/core';
import { NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BaseCrudService } from '../../../common-service/service/base-crud.service';
import { FormServerErrorMessageService } from '../../../common-service/validator-service/form-server-error-message.service';
import { UserRoleFormComponent } from './user-role-form/user-role-form.component';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { AccessItemDto } from 'app/common-service/models/access-item.dto';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import Globals from 'app/common-service/globals';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'user-role',
  templateUrl: './user-role.component.html',
})
export class UserRoleComponent implements OnInit {

  datasource : UserRoleDto[]=[];
  private baseUrlApi : string = "";
  accessItem :AccessItemDto;
    constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService, 
    private modalService: MatDialog, 
    private toastMessageService: ToastMessageService,
    private authService:AuthService,
    private accessKeywordService:AccessKeywordService,
    private serverError: FormServerErrorMessageService ) {
      this.baseUrlApi = Globals.UrlUserRole ;       
   }

   columns = [    
       {
           caption: this.translate.instant('operation'),
      width:150,
      cellTemplate:'editCellTemplate',
      fixed:"true",
      fixedPosition:"right",
    },
     {
        dataField:"id", 
        alignment:"right", 
        caption:this.translate.instant('id'),
        sortOrder:"desc",
        width:80,
        visible: false,
    },
    {
        dataField:"title",
        alignment:"center",
        caption: this.translate.instant('role2'),
    },       
    {
        dataField:"isActive",
        alignment:"center",
        caption: this.translate.instant('active/inactive'),                   
        width:120,
    }
  ];


  

openDialogForm(modelRole?:UserRoleDto) {
  if(!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_User_Role) && modelRole==null){
    return ;
  }

  const activeModal = this.modalService.open(UserRoleFormComponent);
  activeModal.componentInstance.model = Object.assign({}, modelRole);
  activeModal.componentInstance.OnSave.subscribe((receivedEntry) => {
    this.OnSave(receivedEntry);
      activeModal.close();
    });
}
    titlelist:string=''
    ngOnInit() {
        this.titlelist = this.translate.instant('list-of-roles');
    //this.accessItem = new AccessItemDto(0, true, true, true, true, ""); // this.authService.checkAccess("UserRole");
    this.get();       
  }

  onDeleteConfirm(id:number) {

    if(!this.accessKeywordService.checkAccessDelete(AccessKeyword.ACCKEY_User_Role)){
      return ;
    }
    this.toastMessageService.confirmDelete().subscribe((result) => {
      console.log(result);
      if(result==='confirmed'){

      this.crudService.deleteById(this.baseUrlApi , id).subscribe(res=>{
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('deleted-is-successfully'))
            this.get();
          }
          else{
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('encountered-an-error'))
          }
      },
      error =>{
        this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
    },() => {
      this.get();
    });
    } });
  }

  OnUpdate(item : UserRoleDto) {     
    // if(!this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_User_Role)){
    //   return ;
    // }
    this.openDialogForm(item);
  }

  
  isLoading:Boolean=false;
  private get(){
    if(!this.accessKeywordService.checkAccessShow(AccessKeyword.ACCKEY_User_Role)){
      return ;
    }
    this.crudService.get(this.baseUrlApi).subscribe(res=>{
      this.datasource = res ;     
  },
  error =>{
    this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
  });
  }  

  OnSave(model: UserRoleDto){
 
    var id = model.id; 
     if(id==0 || id== undefined){
       this.crudService.postAdd(this.baseUrlApi, model).subscribe(res=>{
         //window.console.log(model);
         if(res){
           this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'),this.translate.instant('added-successfully'))      
          }else{
            this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('error-message'),this.translate.instant('unknown-error'))      
          }
        }, error =>{        
          this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
        },
        () => {
          this.get();
        });
      }else{
        this.crudService.putData(this.baseUrlApi, model, id).subscribe(res=>{
          //window.console.log(model);
          if(res){
            this.toastMessageService.showToast(NbToastStatus.SUCCESS,this.translate.instant('success-message'), this.translate.instant('successfully-edited'))      
           }else{
             this.toastMessageService.showToast(NbToastStatus.DANGER, this.translate.instant('error-message'),this.translate.instant('unknown-error'))      
           }
         }, error =>{        
           this.toastMessageService.showToast(NbToastStatus.DANGER,this.translate.instant('server-error'), error.Message);
         },
         () => {
           this.get();
         });
      }
  }
}
