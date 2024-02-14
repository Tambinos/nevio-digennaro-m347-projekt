import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BicycleComponent} from "./components/bicycle/bicycle.component";
import {NewBicycleComponent} from './components/new-bicycle/new-bicycle.component';
import {SearchBicycleComponent} from './components/search-bicycle/search-bicycle.component';
import { BicycleSearchGuard } from './guards/bicycle-search.guard';
import { BrandComponent } from './components/brand/brand.component';

const routes: Routes = [
  {path: 'homeComp', component: HomeComponent},
  {path: 'new-bicycle', component: NewBicycleComponent },
  {path: '', redirectTo: '/new-bicycle', pathMatch: 'full' },
  {path: 'BicyclesComp', component: BicycleComponent},
  {path: 'Brand/:brandId', component: BrandComponent},
  {path: 'SearchBicycleComponent', canActivate: [BicycleSearchGuard], component: SearchBicycleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
