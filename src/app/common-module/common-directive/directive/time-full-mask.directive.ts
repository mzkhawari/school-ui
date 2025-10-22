import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTimeFullMask][ngModel]',
})
export class TimeFullMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }
  

  onInputChange(event, backspace) {
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 5) {
      newVal = newVal.substring(0, newVal.length - 1);
      event = newVal;
    }
     
    let len = newVal.length;
    let value = newVal;
    if(len ==3){
      newVal = `${value >999 ? 999 : value}`;
    }else if(len ==4){
      newVal = `${ value >9995 ? 9995 : value}` ;
    }else if(len ==5){
      newVal = `${value >99959 ? 99959 : value}`;
    } 
    if (len === 0) {
      newVal = '';
    } else if (len <= 3) {
      value = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (len <= 5) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})/, '$1:$2');    
    } else {
      newVal = newVal.substring(0, 5);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})/, '$1:$2');                                
    }
    if(this.ngControl!==undefined && this.ngControl.valueAccessor){
      this.ngControl.valueAccessor.writeValue(newVal);
    }
  }
}
