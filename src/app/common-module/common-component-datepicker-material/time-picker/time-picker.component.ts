import {Component, Output, EventEmitter, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
})
export class TimePickerComponent implements OnInit {
  
  // _time: string ;
  // get time(): string {
  //     return this._time;
  // }
  // @Input() set time(value: string) {
  //     this._time = value;
  //     this.setTimeToModel();
  // }

  @Input() titleFiled:string =this.translate.instant('clock')
  @Input() class:string ="w-11/12"
  @Input() isDisabled:boolean =false;

  _time: string="";
  get time(): string {
      return this._time;
  }
  @Input() set time(value: string) {
      this._time = value;
      this.setTimeToModel();
  }

  //@Input() time :string;
  @Output() timeChange :EventEmitter<string> = new EventEmitter();

  @Output() valueChange :EventEmitter<string> = new EventEmitter();
  constructor(public translate: TranslateService) {
  }
    
  ngOnInit(){          
  } 
  
  setTimeToModel(){
    this.timeChange.emit(this.time);     


    // if(this.time !== null && this.time !== undefined){
    //   let t1 = this.time.toString();
    //   console.log(this.time); 
    //   let t = t1.split(":");
    //   if(t.length >= 2 ){
    //     //this.model = {hour: parseInt(t[0]), minute: parseInt(t[1]), second:0};
    //   }
    // }else{
    //   //this.model = {hour: 0, minute: 0, second:0};
    // }
  }

}