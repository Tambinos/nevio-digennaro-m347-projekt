import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ProductsComponent} from "./components/products/products.component";
import {CartComponent} from "./components/cart/cart.component";


const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
