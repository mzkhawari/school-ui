import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';

import { FormControl, FormGroup, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';
import { CountryProvinceCityDto } from 'app/basic-module/country-province-city/models/country-province-city.dto';
import { MyErrorStateMatcher, NbToastStatus, ToastMessageService } from '../../../../common-service/service/toast-message.service';

@Component({
  selector: 'city-form',
  templateUrl: './city-form.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityFormComponent),
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
export class CityFormComponent implements OnInit {
  
  @Input()
  model: CountryProvinceCityDto ;
  
  @Output()
  OnSave: EventEmitter<CountryProvinceCityDto> =  new EventEmitter();
  
    countryProvinceCitis: CountryProvinceCityDto[] = [];
    constructor(public translate: TranslateService, public dialogRef: MatDialogRef<CityFormComponent>, private toastMessageService: ToastMessageService) {
  }
    addstring:string=""
    editstring:string=""
    ngOnInit() {
        this.addstring = this.translate.instant('adding-a-county');
        this.editstring = this.translate.instant('edit-county');
    if(this.model.id ==undefined){
      this.model.isActive = true;
      
    }
  }
  cardForm: FormGroup;
  closeModal() {
    this.dialogRef.close();
  }
  
  titleFormControl = new FormControl('', [Validators.required]);
  priorirtyFormControl = new FormControl('', [Validators.required]);
  provinceFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoading: boolean = false;
  OnSubmit(form: NgForm) {
    if(!this.matcher.isErrorState(this.titleFormControl, form) &&
       !this.matcher.isErrorState(this.priorirtyFormControl, form) &&
       !this.matcher.isErrorState(this.provinceFormControl, form))
    {
      this.model.type =3;
      this.OnSave.next(this.model);    
    } else{
      console.log(form.errors);
      this.toastMessageService.showToast(NbToastStatus.WARNING, this.translate.instant('warning'), this.translate.instant('Please-fill-out-the-form-completely'))
    }
  }   
}
