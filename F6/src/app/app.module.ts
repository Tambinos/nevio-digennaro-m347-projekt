import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { IntervalComponent } from './components/interval/interval.component';
import { CelsiusToFahrenheitComponent } from './components/celsius-to-fahrenheit/celsius-to-fahrenheit.component';
import { CelsiusToFahrenheitPipe } from './pipes/celsius-to-fahrenheit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    IntervalComponent,
    CelsiusToFahrenheitComponent,
    CelsiusToFahrenheitPipe
  ],
  imports: [
    BrowserModule,
    RouterOutlet, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
