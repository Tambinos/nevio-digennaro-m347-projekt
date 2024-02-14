import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copyright'
})
export class BrandCopyrightPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase() + '©'
  }
}
