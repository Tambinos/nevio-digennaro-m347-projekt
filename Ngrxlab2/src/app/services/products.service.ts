import {Injectable} from '@angular/core';
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [
    new Product('Phone Kilo', 99),
    new Product('Phone Mega', 199),
    new Product('Phone Giga', 299),
    new Product('Phone Tera', 399),
  ];

  constructor() {
  }
}
