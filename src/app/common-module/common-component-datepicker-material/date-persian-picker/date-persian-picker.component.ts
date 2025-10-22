import {Component, Output, EventEmitter, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'app/common-service/service/toast-message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'date-persian-picker',
  templateUrl: './date-persian-picker.component.html',
  styleUrls:[ './date-persian-picker.component.css'],
})
export class DatePersianPickerComponent implements OnInit {
  
  @Input() titleFiled:string =this.translate.instant('select-date')
  @Input() mode:"outline"|'fill' = 'outline'
  @Input() class:string ="w-11/12"
  @Input() isRequired:boolean =false;
  
  @Input() typeDate:string="M";  // M => Miladi, S => Shamsi
  //@Input() date:any="";
  _date: any;
  get date():any {
      return this._date;
  }
  @Input() set date(value: any) {
      this._date = value;
      this.onSelectedValue();
  }
  @Output() dateChange :EventEmitter<any> = new EventEmitter<any>();

  @Output() dateValueChange :EventEmitter<any> = new EventEmitter<any>();     
  

  dateFormControl =new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();  
  onSelectedValue(){
     
    if(this.isRequired){
      if(!this.matcher.isErrorState(this.dateFormControl, null)){
        this.dateChange.emit(this.date); 
        this.dateValueChange.emit(this._date);   
      }
    }else{
      this.dateChange.emit(this.date); 
      this.dateValueChange.emit(this._date);   
    }
  }

  constructor( public translate: TranslateService) {    
  }
  
  ngOnInit(){      
  }        

}