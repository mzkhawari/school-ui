// greater-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateSmallerEqual][formControlName],[validateSmallerEqual][formControl],[validateSmallerEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SmallerEqualValidator), multi: true }
    ]
})
export class SmallerEqualValidator implements Validator {
    constructor( 
        @Attribute('validateSmallerEqual') public validateSmallerEqual: any) {}

        validate(c: AbstractControl): { [key: string]: any } {
            // self value (e.g. retype password)
            let v = c.value;
            // control value (e.g. password)
            let splitValidations = this.validateSmallerEqual.split(',');
            let e = c.root.get(splitValidations[0]);            
            // value not equal
            if (e && v > e.value)
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