import { Routes } from '@angular/router';
import {BicycleComponent} from "./components/bicycle/bicycle.component";
import {NewBicycleComponent} from "./components/new-bicycle/new-bicycle.component";
import {BrandComponent} from "./components/brand/brand.component";
import {SearchBicycleComponent} from "./components/search-bicycle/search-bicycle.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {path: 'BicyclesComp', component: BicycleComponent},
  {path: '', redirectTo: '/bicycle', pathMatch: 'full'},
  {path: 'bicycle', component: NewBicycleComponent},
  {path: 'Brand/:brandId', component: BrandComponent},
  {path:'SearchBicycleComponent', component: SearchBicycleComponent},
  {path:'homeComp',component:HomeComponent}
];
