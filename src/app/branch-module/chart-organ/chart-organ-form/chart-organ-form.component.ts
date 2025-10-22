import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartOrganDto } from 'app/branch-module/models/chart-organ.dto';
import { LoadingSplashScreenService } from 'app/common-module/loading-component/services/loading-splash-screen.service';
import Globals from 'app/common-service/globals';
import { BaseCrudService } from 'app/common-service/service/base-crud.service';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from 'app/common-service/service/toast-message.service';


@Component({
  selector: 'app-chart-organ-form',
  templateUrl: './chart-organ-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChartOrganFormComponent),
      multi: true
    },
  ]
})
export class ChartOrganFormComponent implements OnInit {


  @Input()
  model: ChartOrganDto;

  @Input()
  parentId: number =0 ;

  constructor(
    public translate: TranslateService,
    private crudService: BaseCrudService,
    public splashScreenService: LoadingSplashScreenService,
    private activateRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<ChartOrganFormComponent>,
    private router: Router,
    private toastMessageService: ToastMessageService) {
    this.model = new ChartOrganDto(0);
  }

  returnUrlAddress = '';
  chartOrgans:any[]=[]
  ngOnInit() {
    this.getOption();

    this.returnUrlAddress = 'branch/chart-organ';
    let id = this.activateRoute.snapshot.params['id'];
    if (id !== undefined && id > 0) {
      this.getItem(id);
    }
  }


  getOption() {
    this.splashScreenService.show();
    this.crudService.getDataUrl(Globals.UrlChartOrgan, "GetSelectOptions").subscribe(res => {
      this.splashScreenService.hide();    
      if(this.parentId==0)
      {        
        this.chartOrgans = res.chartOrgan.filter(f=> f.parentId == null );
      }else{
        this.chartOrgans = res.chartOrgan.filter(f=> f.id == this.parentId);
      } 
    },
    error => {
      this.splashScreenService.hide();
      this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error ", error.Message);
    });
  }

  //#endregion image Upload avatar
  selectedFileAvatar?: File;
  imageURL: string = "../../../../assets/images/Akramzada/avatar-pic.png";
  setImage(item, key) {
    const file = (item.target as HTMLInputElement).files[0];
    this.selectedFileAvatar = file;
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
        this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  //#endregion


  titleFormControl = new FormControl('', [Validators.required]);
  codeFormControl = new FormControl('', [Validators.required]);
  parentFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if (!this.matcher.isErrorState(this.titleFormControl, form) &&
        !this.matcher.isErrorState(this.codeFormControl, form) &&
        (!this.matcher.isErrorState(this.parentFormControl, form) || this.model.id==1)) {
      this.OnSave(this.model);
    } else {
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('please-enter-correctly'))
    }
  }

  OnSave(model: ChartOrganDto) {
     
    this.splashScreenService.show();
    var id = model.id;
    if (id == 0 || id == undefined) {
      model.id = 0;
    }

    model.userId =0;
    if(model.id==0 && model.parentId==null){
      model.parentId =0;
    }


    const formData: FormData = new FormData();
    let modelData: any = model;
    let keyItem: any;
     
    for (const key in modelData) {
      if (modelData.hasOwnProperty(key)) {
        formData.append(key, modelData[key]);
        if (key == 'boss' || key == 'deputy' || key == 'license') {
           
          keyItem = modelData[key];
          for (const key2 in keyItem) {
            if (modelData.hasOwnProperty(key2)) {
              formData.append(`${key}.${key2}`, keyItem[key2]);
            }
          }
        }
      }
    }
    if (this.selectedFileAvatar) {
      let name = this.selectedFileAvatar.name;
      //let ext = name !== '' ? name.split('.')[1] : ''
      formData.append('file', this.selectedFileAvatar, `avatar-${name}`);
    }


      this.crudService.postFormData(`${Globals.UrlChartOrgan}postChartOrgan`, formData).subscribe(res => {
        if (res) {
          this.toastMessageService.showToast(NbToastStatus.SUCCESS, "Success", "SuccessFully is Saved")
          this.router.navigateByUrl(`/branch/chart-sub-organ/${this.parentId}`);
        } else {
          this.toastMessageService.showToast(NbToastStatus.DANGER, "Warning ", res)
        }
      }, error => {
        this.splashScreenService.hide();
        this.toastMessageService.showToast(NbToastStatus.DANGER, "Server Error", error.Message);
      },
      () => {
        this.splashScreenService.hide();
        this.dialogRef.close();
        this.router.navigateByUrl(`/branch/chart-sub-organ/${this.parentId}`);
      })

  }


  private getItem(id: number) {
    this.splashScreenService.show();
    this.crudService.getById(Globals.UrlApplicantingCode, id).subscribe(res => {
      this.splashScreenService.hide();
      this.model = res;
    },
      error => {
        this.splashScreenService.hide();
      });
  }
}
