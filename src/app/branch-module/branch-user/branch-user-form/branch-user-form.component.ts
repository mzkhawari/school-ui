import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BranchUserDto } from 'app/branch-module/models/branch-user.dto';


@Component({
  selector: 'app-branch-user-form',
  templateUrl: './branch-user-form.component.html',
  styleUrls: ['./branch-user-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BranchUserFormComponent),
      multi: true
    },
  ]
})
export class BranchUserFormComponent implements OnInit {


  @Input()
  branchId: number;
  

  model: BranchUserDto;
  users:any[]=[];
  branches:any[]=[];

  constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private activateRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<BranchUserFormComponent>,
    private accessKeywordService:AccessKeywordService,
    private toastMessageService: ToastMessageService) {
    this.model = new BranchUserDto();
  }

  isSaveButton:boolean = true;
  ngOnInit() {

    if(!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Branch_User)){
      //this.toastMessageService.showToast(NbToastStatus.WARNING, "پیام" , "شما دسترسی به افزودن در لیست این بخش ندارید");
      //this.router.navigateByUrl('index-info');
      //return;
      this.isSaveButton = false;
    }  

    if(!this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Branch_User)){
      this.isSaveButton = false;
    }  

    this.getOption();

    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      this.getItem(id);
    }else{
      this.model.isActive = true;
    }
  }


  

  getOption() {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlBranchUser, "GetSelectOptions").subscribe(res => {
      this.splashScreenService.hide();
      this.users = res.users;
      this.branches = res.branch;
    },
    error => {
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
    });
  }

  //#region  upload files
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

     
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  //#endregion

  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
      this.OnSave(this.model);
  }

  //description = "";
  //description_tr = "";
  OnSave(modelItem: BranchUserDto) {
     
    this.splashScreenService.show();
    var id = modelItem.id;
    if (id == 0 || id == undefined) {
      modelItem.id = 0;
    }
    modelItem.branchId =  this.branchId;

    this.crudService.postAdd(Globals.UrlBranchUser, modelItem).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
        }
        this.dialogRef.close();
      }, error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
      },
      () => {
        this.splashScreenService.hide();
        this.dialogRef.close()
      })
  }


  private getItem(id: number) {
    this.splashScreenService.show();
    this.crudService.getById(Globals.UrlBranchUser, id).subscribe(res => {
      this.splashScreenService.hide();
      this.model = res;
    },
      error => {
        this.splashScreenService.hide();
      });
  }
}
