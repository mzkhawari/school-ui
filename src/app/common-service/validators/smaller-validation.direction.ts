// greater-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateSmaller][formControlName],[validateSmaller][formControl],[validateSmaller][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SmallerValidator), multi: true }
    ]
})
export class SmallerValidator implements Validator {
    constructor( 
        @Attribute('validateSmaller') public validateSmaller: any) {}

        validate(c: AbstractControl): { [key: string]: any } {
            // self value (e.g. retype password)
            let v = c.value;
            // control value (e.g. password)
            let splitValidations = this.validateSmaller.split(',');
            let e = c.root.get(splitValidations[0]);            
            // value not equal
            if (e && v >= e.value)
            {                
                 return {            
                    validateSmaller: false,
                    fromControl: splitValidations[1],
                    toControl: splitValidations[2]                   
                }
            }         
            return {};
    }
}