import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDateMask][ngModel]',
})
export class DateMaskDirective {

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
    if (backspace && newVal.length <= 8) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
     
    let len = newVal.length;
    let value = newVal;     
    if (len === 0) {
      newVal = '';
    } else if (len <= 4) {
      value = newVal.replace(/^(\d{0,4})/, '$1');
    } else if (len <= 6) {
      newVal = newVal.replace(/^(\d{0,4})(\d{0,2})/, '$1/$2');    
    } else if (len <= 8) {
      newVal = newVal.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})/, '$1/$2/$3');    
    } else {
      newVal = newVal.substring(0, 8);
      newVal = newVal.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})/, '$1/$2/$3');                                
    }
    if(this.ngControl!==undefined && this.ngControl.valueAccessor){
      this.ngControl.valueAccessor.writeValue(newVal);
    }
  }
}
