import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTimeMask][ngModel]',
})
export class TimeMaskDirective {

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
    if (backspace && newVal.length <= 4) {
      newVal = newVal.substring(0, newVal.length - 1);
      event = newVal;
    }
     
    let len = newVal.length;
    let value = newVal;
    if(len ==2){
      newVal = `${value >23 ? 23 : value}`;
    }else if(len ==3){
      newVal = `${ value >235 ? 235 : value}` ;
    }else if(len ==4){
      newVal = `${value >2359 ? 2359 : value}`;
    } 
    if (len === 0) {
      newVal = '';
    } else if (len <= 2) {
      value = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (len <= 4) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');    
    } else {
      newVal = newVal.substring(0, 4);
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');                                
    }
    if(this.ngControl!==undefined && this.ngControl.valueAccessor){
      this.ngControl.valueAccessor.writeValue(newVal);
    }
  }
}