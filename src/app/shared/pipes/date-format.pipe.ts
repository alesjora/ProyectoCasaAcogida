import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const fecha = value.split('-');
    return fecha[2] + '/' + fecha[1] + '/' + fecha[0];
  }

}
