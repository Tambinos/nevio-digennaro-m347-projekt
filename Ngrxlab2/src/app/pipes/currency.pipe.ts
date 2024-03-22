import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currency = 'CHF'): unknown {
    return value + ' ' + currency;
  }
}
