import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[persianNumberToEnglish]'
})
export class PersianNumberToEnglishDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInput(event: any) {
        const initialValue = this.el.nativeElement.value;
        const convertedValue = this.convertToEnglish(initialValue);
        if (convertedValue !== initialValue) {
            this.el.nativeElement.value = convertedValue;
            event.stopPropagation();
        }
    }

    @HostListener('blur')_(){
        const initialValue = this.el.nativeElement.value;
        const convertedValue = this.convertToEnglish(initialValue);
        if (convertedValue !== initialValue) {
            this.el.nativeElement.value = convertedValue;
            event.stopPropagation();
        }
    }

    private convertToEnglish(inputValue: string): string {
        if (inputValue.length ==0 ) return '';

        const persianToEnglish = {
            '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
        };

        return inputValue.replace(/[\u06F0-\u06F9]/g, match => {
            return persianToEnglish[match];
        });
    }
}
