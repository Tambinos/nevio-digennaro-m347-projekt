import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe } from './pipes/currency.pipe';
import {cartReduced} from "./reducers/cart.reducer";
import {AsyncPipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({cart: cartReduced}),
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    CurrencyPipe,
    AsyncPipe
    // Include AppRoutingModule here
  ],
  providers: [],
  exports: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
