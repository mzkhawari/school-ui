import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianToEnglishNumber'
})
export class PersianToEnglishNumberPipe implements PipeTransform {

  transform(value: string): string {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let convertedValue = value;
    for (let i = 0; i < persianNumbers.length; i++) {
      const persianNumber = persianNumbers[i];
      const englishNumber = englishNumbers[i];
      const regex = new RegExp(persianNumber, 'g');
      convertedValue = convertedValue.replace(regex, englishNumber);
    }

    return convertedValue;
  }

}
