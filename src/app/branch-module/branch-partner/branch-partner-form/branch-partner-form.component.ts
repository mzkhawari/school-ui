import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import Globals from 'app/common-service/globals';
import { CountryProvinceCityDto } from 'app/common-service/models/Base/country-province-city.dto';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../common-service/service/toast-message.service';
import { BranchDto } from 'app/branch-module/models/branch.dto';


@Component({
  selector: 'app-branch-partner-form',
  templateUrl: './branch-partner-form.component.html',
  styleUrls: ['./branch-partner-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BranchPartnerFormComponent),
      multi: true
    },
  ]
})
export class BranchPartnerFormComponent implements OnInit {


  @Input()
  model: BranchDto;

  users:any[]=[];
  provinces:any[]=[];
  countries:any[]=[];
  cities:CountryProvinceCityDto[]=[];
  
  optionSelect: any = null;


    constructor(
        public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private activateRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<BranchPartnerFormComponent>,
    private router: Router,
    private accessKeywordService:AccessKeywordService,
    private toastMessageService: ToastMessageService) {
    this.model = new BranchDto();
    this.model.isPartner = true;
  }

  returnUrlAddress = '';
  ngOnInit() {

    if(!this.accessKeywordService.checkAccessAdd(AccessKeyword.ACCKEY_Branch)){
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('message2'),this.translate.instant('you-do-not-have-access-toadd-to-the-list-in-this-section'));
      this.router.navigateByUrl('index-info');
      return;
    }  

    this.getOption();
    
    this.returnUrlAddress = 'branch/branch-partner';
    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      this.getItem(id);
    }else{
      this.model.isActive = true;
    }
  }


  cityOnProvince : CountryProvinceCityDto[]=[]
  selectCity(item:any){
    let id = item.value ;
    this.cityOnProvince = this.cities.filter(f=>f.parentId==id);
  }

  getOption() {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlBranch, "GetSelectOptions").subscribe(res => {
      this.splashScreenService.hide();
      this.users = res.users;
      this.provinces = res.province;
      this.cities = res.city;
      this.countries = res.country
      this.cityOnProvince = this.cities.filter(f=>f.parentId== this.model.provinceId);
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

  titleFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required]);
  branchManagerFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if(!this.matcher.isErrorState(this.titleFormControl, form) && 
       !this.matcher.isErrorState(this.emailFormControl, form)&& 
       !this.matcher.isErrorState(this.branchManagerFormControl, form)&& 
       !this.matcher.isErrorState(this.addressFormControl, form)&& 
       !this.matcher.isErrorState(this.phoneFormControl, form))
    {
      this.OnSave(this.model);
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-enter-correctly'))
    }
  }

  //description = "";
  //description_tr = "";
  OnSave(model: BranchDto) {
    this.model.isPartner = true; 
    this.splashScreenService.show();
    var id = model.id;
    if (id == 0 || id == undefined) {
      model.id = 0;
    }

    if(model.id==0){
      this.crudService.postDataUrl(Globals.UrlBranch,"PostBranch", model).subscribe(res => {
        if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
      } else {
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
      }
      }, error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
      },
      () => {
        this.splashScreenService.hide();
        this.router.navigateByUrl('branch/branch-partner');
      })
    }else{
      this.crudService.putData(Globals.UrlBranch, model, model.id).subscribe(res => {
        if (res) {
        this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
      } else {
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
      }
      }, error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
      },
      () => {
        this.splashScreenService.hide();
        this.router.navigateByUrl('branch/branch-partner');
      })
    }
    
  }


  private getItem(id: number) {
    this.splashScreenService.show();
    this.crudService.getById(Globals.UrlBranch, id).subscribe(res => {
      this.splashScreenService.hide();
      this.model = res;
      this.cityOnProvince = this.cities.filter(f=>f.parentId== this.model.provinceId);
      if (this.model == undefined && id > 0) {
        this.router.navigateByUrl("/ches");
      }
    },
      error => {
        this.splashScreenService.hide();
      });
  }
}
