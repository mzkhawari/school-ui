// greater-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateSelected][formControlName],[validateSelected][formControl],[validateSelected][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SelectedValidator), multi: true }
    ]
})
export class SelectedValidator implements Validator {
    constructor() {}

        validate(c: AbstractControl): { [key: string]: any } {
            // self value (e.g. retype password)
            let v = c.value;
            // value not equal
            if (v && v >= 0)
            {                
                 return {            
                    validateSelected: false,
                }
            }         
            return {};
    }
}