import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormGroup, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CountryProvinceCityDto } from 'app/basic-module/country-province-city/models/country-province-city.dto';
import { NbToastStatus, ToastMessageService } from '../../../../common-service/service/toast-message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'country-form',
  templateUrl: './country-form.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryFormComponent),
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
export class CountryFormComponent implements OnInit {
  
  @Input()
  model: CountryProvinceCityDto ;
  
  @Output()
  OnSave: EventEmitter<CountryProvinceCityDto> =  new EventEmitter();
  
  countryProvinceCitis:CountryProvinceCityDto[];
  constructor( public translate: TranslateService,public dialogRef: MatDialogRef<CountryFormComponent>, private toastMessageService : ToastMessageService ) {
  }

  ngOnInit() {
  }

  cardForm: FormGroup;
  closeModal() {
    this.dialogRef.close();
  }

  OnSubmit(form:NgForm){  
    if(form.valid){      
      this.OnSave.next(this.model);    
    } else{
      console.log(form.errors);
      //this.formService.markFormGroupTouched(form.form);
      this.toastMessageService.showToast(NbToastStatus.WARNING,this.translate.instant('warning'),this.translate.instant('Please-fill-out-the-form-completely'))
    }
  }   



}
