import { Pipe, PipeTransform } from '@angular/core'; 

@Pipe({ name: 'currencyNumber' }) 
export class CurrencyNumberPipe implements PipeTransform { 
  
  // transform(value: number): string { 
  //   if (!value) return ''; 
  //   let stringValue = value.toFixed(2); 
  //   const groups = []; 
  //   const parts = stringValue.split('.'); 
  //   let integerPart = parts[0]; 
  //   let decimalPart = parts[1]; 
  //   while (integerPart.length > 3) { 
  //     groups.push(integerPart.slice(-3)); 
  //     integerPart = integerPart.slice(0, -3); 
  //   } 
  //   groups.push(integerPart); 
  //   return groups.reverse().join(',') + '.' + decimalPart; } 

  // transform(value: number, decimalPlaces: number = 2): string {
  //   if (value === null || value === undefined || isNaN(value)) {
  //     return '';
  //   }

  //   let stringValue = value.toFixed(decimalPlaces);
  //   const parts = stringValue.split('.');
  //   let integerPart = parts[0];
  //   const decimalPart = parts.length > 1 ? parts[1] : '';

  //   const groups = [];
  //   while (integerPart.length > 3) {
  //     groups.push(integerPart.slice(-3));
  //     integerPart = integerPart.slice(0, -3);
  //   }
  //   groups.push(integerPart);

  //   return groups.reverse().join(',') + (decimalPart ? '.' + decimalPart : '');
  // }

  transform(value: number, decimalPlaces: number = 2): string {
    if (value === null || value === undefined || isNaN(value) || value=== 0 ) {
      return '';
    }

    const numStr = value.toString();
    const parts = numStr.split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? parts[1] : '';

    // فرمت‌بندی قسمت صحیح (جداکننده هزارگان)
    let formattedIntegerPart = '';
    for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
      formattedIntegerPart = integerPart[i] + formattedIntegerPart;
      if (count % 3 === 2 && i !== 0) {
        formattedIntegerPart = ',' + formattedIntegerPart;
      }
    }

    // فرمت‌بندی قسمت اعشاری (بدون گرد کردن)
    let formattedDecimalPart = '';
    if (decimalPart) {
      formattedDecimalPart = decimalPart.substring(0, decimalPlaces); // برش به تعداد ارقام اعشاری
    }
    if (decimalPlaces > 0 && !formattedDecimalPart) {
      formattedDecimalPart = '0'.repeat(decimalPlaces); // در صورت نبود قسمت اعشاری، صفر اضافه میکند
    }

    return formattedIntegerPart + (formattedDecimalPart ? '.' + formattedDecimalPart : '');
  }
  
  
}
