import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null || value === undefined) {
      return '';
    }
    let fecha;
    if(/:/.test(value)){
      value = value.split(' ')[0];
    }
    if (/\//.test(value)) {
      fecha = value.split('/');
    }
    if (/-/.test(value)) {
      fecha = value.split('-');
    }

    return fecha[2] + '/' + fecha[1] + '/' + fecha[0];
  }

}
