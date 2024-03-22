import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyCounterComponent} from "./components/my-counter/my-counter.component";


const routes: Routes = [
  {path: 'my-counter', component: MyCounterComponent},
  {path: '', redirectTo: '/my-counter', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
