import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'copyright'
})
export class BrandCopyrightPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase() + '©'
  }
}
