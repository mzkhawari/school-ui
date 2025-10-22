import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccessKeyRoleUserDto } from 'app/common-service/models/web-site/access-key-role-user.dto';
import { AccessKeyDto } from 'app/common-service/models/web-site/access-key.dto';
import { UserRoleDto } from 'app/common-service/models/web-site/user-role.dto';
import { UserDto } from 'app/common-service/models/web-site/user.dto';
import { NbToastStatus, ToastMessageService } from  '../../../../common-service/service/toast-message.service';

@Component({
  selector: 'app-accesskey-role-user-form',
  templateUrl: './accesskey-role-user-form.component.html',
})
export class AccessKeyRoleUserFormComponent implements OnInit {

  @Input()
  model: AccessKeyRoleUserDto;
  @Input()
  OnRoleList : EventEmitter<UserRoleDto> = new EventEmitter();
  @Input()
  OnUserList : EventEmitter<UserDto> = new EventEmitter();
  @Input()
  OnAccessKeyList : EventEmitter<AccessKeyDto> = new EventEmitter();
  @Output()
  OnSave: EventEmitter<AccessKeyRoleUserDto> =  new EventEmitter();
  @Output()
  OnSaveFull: EventEmitter<AccessKeyRoleUserDto> =  new EventEmitter();
  
  roles: UserRoleDto[]=[];
  users: UserDto[]=[];
  accessKeys: AccessKeyDto[]=[];
  isFullAccessButton:boolean = false;

  onRoleAccess: number = 0;
  onTypeAccess: number = 0;
  listAccessWebKeys= [];
  parentFiledId :string ="AccessKeyParentId";
    //private formField : FormControl;
    constructor(public translate: TranslateService, public dialogRef: MatDialogRef<AccessKeyRoleUserFormComponent>, private base: FormBuilder, private toastMessageService: ToastMessageService) {
    this.model = new AccessKeyRoleUserDto(0);
  }

    addstring:string=''
    editstring:string=''
    ngOnInit() {
        this.addstring = this.translate.instant('adding-access');
        this.editstring = this.translate.instant('edit-access');
    this.OnRoleList.subscribe(res=>{
        this.roles = res as UserRoleDto[];
    });

    this.OnUserList.subscribe(res=>{
        this.users = res as UserDto[];        
    });

    this.OnAccessKeyList.subscribe(res=>{
        this.accessKeys = res as AccessKeyDto[];
          this.listAccessWebKeys = this.accessKeys ;
          console.log("listAccessWebKeys:")
          console.log(this.listAccessWebKeys)
          
          if(this.listAccessWebKeys!=undefined){
            this.groupHeders = this.listAccessWebKeys.filter((elem, index)=>{
                return elem.AccessKeyParentId ==0 || elem.AccessKeyParentId == undefined || elem.AccessKeyParentId == null;
            });    
          }

          if(this.model!=null && this.model != undefined){
            if(this.model.userId==undefined){
              this.onRoleAccess = 0;
            }else
              this.onRoleAccess = this.model.userId > 0 ? 1 : 0
          }
    });

    if(this.model!=undefined && this.model.id > 0){
      this.isFullAccessButton = false;
    }else{
      this.isFullAccessButton = true;
    }
    
  }

  groupHeders:any[]=[]
  getFilterData(id:number){
    return this.listAccessWebKeys.filter((elem, index)=>{
            return elem.AccessKeyParentId == id;
            });
  }

  onTypeAccessChange(item){
    if(this.onTypeAccess==0)
    {
      this.onRoleAccess = item.value
    }else{
      this.onRoleAccess = item.value
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  OnSubmitItem(event){
  }

  
  OnSelectChange(item:any){
     
    this.model.accessKeyId = item.value;
  }

  OnSaveAccess(){

    if(this.model.userId !=undefined && this.model.userRoleId !=undefined){
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'), this.translate.instant('please-select-a-user-or-role'));
      return;
    }
    this.OnSaveFull.next(this.model);    
  }


  isLoading:boolean=false;
  OnSubmit(form:NgForm){

     
    if(form.valid){
      this.OnSave.next(this.model);    
    } else{
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'), this.translate.instant('please-fill-in-the-form-values-​​correctly'))
    }   
  }
}
