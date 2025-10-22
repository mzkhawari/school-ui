// equal-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor( 
        @Attribute('validateEqual') public validateEqual: any) {}

        validate(c: AbstractControl): { [key: string]: any } {
            // self value (e.g. retype password)
            let v = c.value;
            // control value (e.g. password)
            let splitValidations = this.validateEqual.split(',');
            let e = c.root.get(splitValidations[0]);            
            let againstCtrl = splitValidations[1];
            // value not equal
            if (e && v !==e.value)
            {                
                 return {            
                    validateEqual: false,
                    fromControl: splitValidations[1],
                    toControl: splitValidations[2]                   
                }
            }         
            return {} ;
    }
}