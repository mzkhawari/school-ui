import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDigiSeperator]',
})
export class DigiSeperatorDirective {
  @Input()
  detachableDigit: number;
  @Input()
  totalFigures: number;

//  Example:
//   <input
//   type="text"
//   appOnlyNumber
//   appDigiSeperator
//   [detachableDigit]="4"
//   [totalFigures]="16"
//   [(ngModel)]="data"
// />

  @HostListener('keyup', ['$event'])
  onKeyDown(event) {
    let enteredNumber = 
        this.check_number_not_longer_than_total_figure(
            this.remove_space_from_numbers(event.target.value)
        );

    const categorizedNumbers = [];

    for (
      let index = 0;
      index < enteredNumber.length;
      index += this.detachableDigit
    ) {
      const seperatedDigit = this.substring_numbers_by_digit(
        enteredNumber,
        index,
        this.detachableDigit
      );

      categorizedNumbers.push(seperatedDigit);
    }

    event.target.value = this.join_categorized_numbers(categorizedNumbers);
  }

  private remove_space_from_numbers(numbers: string) {
    return numbers.replace(/\s/g, '');
  }

  private check_number_not_longer_than_total_figure = (numbers: string) => {
    if (numbers.length > this.totalFigures) {
      return numbers.slice(0, this.totalFigures);
    }

    return numbers;
  };

  private substring_numbers_by_digit(
    numbers: string,
    startIndex: number,
    endIndex: number
  ) {
    return numbers.substring(startIndex, startIndex + endIndex);
  }

  private join_categorized_numbers(categorizedNumbers: number[]) {
    return categorizedNumbers.join(' ');
  }
}