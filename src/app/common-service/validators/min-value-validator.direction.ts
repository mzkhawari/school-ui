// greater-validator.directive.ts

import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateMinValue][formControlName],[validateMinValue][formControl],[validateMinValue][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MinValueValidator), multi: true }
    ]
})
export class MinValueValidator implements Validator {
    constructor( 
        @Attribute('validateMinValue') public validateMinValue: number) {}

        validate(c: AbstractControl): { [key: string]: any } {

            let v = c.value;
            // control value (e.g. password)
            let minValue = this.validateMinValue;
            if (v < minValue)
            {                
                 return {            
                    validateMinValue: false,
                    minimumValue: minValue,
                }
            }         
            return {};
    }
}