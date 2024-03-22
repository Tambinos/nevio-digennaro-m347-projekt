import {Injectable} from '@angular/core';
import {Brand} from '../models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  data: Brand[] = [
    new Brand(1, "Trek", false),
    new Brand(2, "Mount", true),
    new Brand(3, "Canyon", false)
  ]

  getBrands() {
    return this.data;
  }

  getBrand(id: number): Brand {
    // if (this.data.find(brand => brand.id === id) === undefined){
    //   throw new Error("Brand not found")
    // }
    // @ts-ignore
    return this.data.find(brand => brand.id === id)
  }

  getBrandName(id: number): string {
    if (this.data.find(brand => brand.id === id) === undefined) {
      throw new Error("Brand not found")
    }
    // @ts-ignore
    return this.data.find(brand => brand.id === id).brand
  }
}

