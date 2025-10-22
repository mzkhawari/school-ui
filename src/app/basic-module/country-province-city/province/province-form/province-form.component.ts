import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';
import { CountryProvinceCityDto } from 'app/basic-module/country-province-city/models/country-province-city.dto';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../../common-service/service/toast-message.service';
import { AccessKeywordService } from 'app/common-service/access-keyword-service/access-keyword-service.service';
import AccessKeyword from 'app/common-service/access-keyword-service/access-keyword';

@Component({
  selector: 'province-form',
  templateUrl: './province-form.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceFormComponent),
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      }
    }
  ]
})
export class ProvinceFormComponent implements OnInit {
  
  @Input()
  model: CountryProvinceCityDto ;
  @Input()
  countryProvinceCitis:CountryProvinceCityDto[];
  
  @Output()
  OnSave: EventEmitter<CountryProvinceCityDto> =  new EventEmitter();

    constructor(public translate: TranslateService, 
                public dialogRef: MatDialogRef<ProvinceFormComponent>, 
                private accessKeywordService:AccessKeywordService,
                private toastMessageService: ToastMessageService, private _formBuilder: FormBuilder) {
  }
    addstring:string=''
    editstring:string=''
    isSaveButton:boolean = true;
    ngOnInit() {

      if (!this.accessKeywordService.checkAccessEdit(AccessKeyword.ACCKEY_Province_City)) {
        this.isSaveButton = false;
      }
        this.addstring = this.translate.instant('adding-a-province');
        this.editstring = this.translate.instant('edit-province');
    if(this.model.id==undefined){
      this.model.isActive =true;
      
    }
    this.dangerLevels.push({id:1, title:1}, {id:2, title:2}, {id:3, title:3})
  }
  dangerLevels:any[]=[];
  closeModal() {
    this.dialogRef.close();
  }


  titleFormControl = new FormControl('', [Validators.required]);
  priorirtyFormControl = new FormControl('', [Validators.required]);
  countryFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if(!this.matcher.isErrorState(this.titleFormControl, form) &&
       !this.matcher.isErrorState(this.priorirtyFormControl, form) &&
       !this.matcher.isErrorState(this.countryFormControl, form))
    {
      this.model.type = 2;
      this.OnSave.next(this.model);    
    } else{
      console.log(form.errors);
      //this.formErrors = this.formService.validateForm(form.form , this.formErrors, false);
      //this.formService.markFormGroupTouched(form.form);
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('Please-fill-out-the-form-completely'))
    }
  }   



}
