import {Component} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ProductsService} from "../../services/products.service";
import {NgForOf} from "@angular/common";
import {Product} from "../../models/Product";
import {MatButtonModule} from "@angular/material/button";
import {CurrencyPipe} from "../../pipes/currency.pipe";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {add, remove, reset} from "../../actions/cart.actions";

@Component({
  imports: [
    MatToolbarModule,
    RouterLink,
    MatCardModule,
    NgForOf,
    MatButtonModule,
    CurrencyPipe
  ],
  selector: 'app-products',
  standalone: true,
  styleUrls: ['./products.component.css'],
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  cart$: Observable<Product[]> = new Observable<Product[]>();

  constructor(protected productsService: ProductsService, private store: Store<{ cart: Product[] }>) {
    this.cart$ = this.store.select('cart');
  }

  addToCart(product: Product) {
      this.store.dispatch(add({product}));
  }
}
