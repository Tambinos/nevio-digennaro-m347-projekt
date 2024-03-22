import {Component} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {Product} from "../../models/Product";
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {CurrencyPipe} from "../../pipes/currency.pipe";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {remove, reset} from "../../actions/cart.actions";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [
    MatToolbarModule,
    CurrencyPipe,
    FormsModule,
    AsyncPipe,
    NgForOf,
    MatButtonModule,
    RouterLink,
  ],
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$: Observable<Product[]> = new Observable<Product[]>();
  cartTotal: Observable<number> = new Observable<number>();

  constructor(private store: Store<{ cart: Product[] }>) {
    this.cart$ = this.store.select('cart');
    this.cartTotal = this.cart$.pipe(
      map(products => products.reduce((acc, product) => acc + product.price, 0))
    ) ?? 0;
  }

  removeFromCart(index: number) {
    this.store.dispatch(remove({index}));
  }

  resetCart() {
    this.store.dispatch(reset());
  }
  checkout() {
    this.resetCart();
    alert('Thank you for your purchase!')
  }
}
