import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {DefaultComponent} from "./components/default/default.component";
import {BicycleComponent} from "./components/bicycle/bicycle.component";

const routes: Routes = [
  {path: 'homeComp', component: HomeComponent},
  {path:'', component:DefaultComponent},
  {path:'BicyclesComp', component:BicycleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
