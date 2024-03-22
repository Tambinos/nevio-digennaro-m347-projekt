import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'currency'
})
export class BicycleValuePipe implements PipeTransform {
  transform(value: number, currency: string = 'CHF'): string {
    let valueAsString = Math.round(value).toString();
    for (let i = valueAsString.length - 3; i > 0; i -= 3) {
      valueAsString = valueAsString.slice(0, i) + "'" + valueAsString.slice(i);
    }
    return valueAsString + '.00 ' + currency;
  }
}
