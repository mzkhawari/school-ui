// greater-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateGreaterEqual][formControlName],[validateGreaterEqual][formControl],[validateGreaterEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => GreaterEqualValidator), multi: true }
    ]
})
export class GreaterEqualValidator implements Validator {
    constructor( 
        @Attribute('validateGreaterEqual') public validateGreaterEqual: any) {}

        validate(c: AbstractControl): { [key: string]: any } {
            // self value (e.g. retype password)
            let v = c.value;
            // control value (e.g. password)
            let splitValidations = this.validateGreaterEqual.split(',');
            let e = c.root.get(splitValidations[0]);            
            // value not equal
            if (e && v < e.value)
            {                
                 return {            
                    validateGreaterEqual: false,
                    fromControl: splitValidations[1],
                    toControl: splitValidations[2]                   
                }
            }         
            return {};
    }
}