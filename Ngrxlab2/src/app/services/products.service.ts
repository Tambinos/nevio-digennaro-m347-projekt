import {Injectable} from '@angular/core';
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [
    {name: 'Phone XL', price: 799},
    {name: 'Phone Mini', price: 699},
    {name: 'Phone Standard', price: 299}
  ];

  constructor() {
  }
}
