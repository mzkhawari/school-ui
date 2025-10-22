// greater-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateGreater][formControlName],[validateGreater][formControl],[validateGreater][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GreaterValidator), multi: true }
    ]
})
export class GreaterValidator implements Validator {
    constructor( 
        @Attribute('validateGreater') public validateGreater: any) {}

        validate(c: AbstractControl): { [key: string]: any } {
            // self value (e.g. retype password)
            let v = c.value;
            // control value (e.g. password)
            let splitValidations = this.validateGreater.split(',');
            let e = c.root.get(splitValidations[0]);            
            // value not equal
            if (e && v <= e.value)
            {                
                 return {            
                    validateGreater: false,
                    fromControl: splitValidations[1],
                    toControl: splitValidations[2]                   
                }
            }         
            return {};
    }
}