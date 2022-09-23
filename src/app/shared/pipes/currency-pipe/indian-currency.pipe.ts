import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency'
})
export class IndianCurrencyPipe implements PipeTransform {

  transform(value:number): any {
    let newValue;
    newValue = "₹" + value;
    return newValue;
  }

}
