// greater-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateMaxValue][formControlName],[validateMaxValue][formControl],[validateMaxValue][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MaxValueValidator), multi: true }
    ]
})
export class MaxValueValidator implements Validator {
    constructor( 
        @Attribute('validateMaxValue') public validateMaxValue: number) {}

        validate(c: AbstractControl): { [key: string]: any } {

            let v = c.value;
            let maxValue = this.validateMaxValue;
            if (v > maxValue)
            {                
                 return {            
                    validateMaxValue: false,
                    maximumValue: maxValue,
                }
            }         
            return {};
    }
}