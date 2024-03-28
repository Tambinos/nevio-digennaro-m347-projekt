import {Injectable} from '@angular/core';
import {Brand} from '../models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  data: Brand[] = [
    {id: 1, brand: 'Brand 1', is_cheap_brand: true},
    {id: 2, brand: 'Brand 2', is_cheap_brand: false},
    {id: 3, brand: 'Brand 3', is_cheap_brand: true}
  ]

  getBrands() {
    return this.data;
  }

  getBrand(id: number): Brand {
    const brand = this.data.find(brand => brand.id === id)
    if (brand) {
      return brand
    } else {
      throw new Error("Brand not found")
    }
  }

  getBrandName(id: number): string {
    const brand = this.data.find(brand => brand.id === id)
    if (!brand) throw new Error("Brand not found")
    return brand.brand
  }
}

