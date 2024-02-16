import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationComponent} from "./components/notification/notification.component";
import {IntervalComponent} from "./components/interval/interval.component";
import {CelsiusToFahrenheitComponent} from "./components/celsius-to-fahrenheit/celsius-to-fahrenheit.component";
const routes: Routes = [
  {
    path: 'notification', component: NotificationComponent
  },
  {
    path: '', redirectTo: '/notification', pathMatch: 'full',
  },
  {
    path: 'interval', component: IntervalComponent
  },
  {
    path: 'celsiusToFahrenheit', component: CelsiusToFahrenheitComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
