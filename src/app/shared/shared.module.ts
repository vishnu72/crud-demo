import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndianCurrencyPipe } from './pipes/currency-pipe/indian-currency.pipe';



@NgModule({
  declarations: [
  
    IndianCurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    IndianCurrencyPipe
  ]
  
})
export class SharedModule { }
