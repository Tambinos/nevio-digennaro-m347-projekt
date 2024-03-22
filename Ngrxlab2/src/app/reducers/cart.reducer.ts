import {createReducer, on} from '@ngrx/store';
import {Product} from "../models/Product";
import {add, remove, reset} from "../actions/cart.actions";

export const initialCart: Product[] = JSON.parse(window.localStorage.getItem('cart') ?? '[]')

export const cartReduced = createReducer(
  initialCart,
  on(add, (state, {product}) => [...state, product]),
  on(remove, (state, {index}) => state.filter((p, i) => i !== index)),
  on(reset, (state) => [])
);
