import {Injectable} from '@angular/core'
import {Bicycle} from "../models/Bicycle"
import {TypeService} from './type.service'
import {BrandService} from './brand.service'
import {FullBicycle} from '../models/FullBicycle'

@Injectable({
  providedIn: 'root'
})

export class BicycleService {

  private data: Bicycle[] = [
    {id: 1, name: 'Bicycle 1', value: 100, brandID: 1, typeID: 1},
    {id: 2, name: 'Bicycle 2', value: 200, brandID: 2, typeID: 2},
    {id: 3, name: 'Bicycle 3', value: 300, brandID: 3, typeID: 3},
  ]

  getAllBicycles(): Bicycle[] {
    return this.data
  }

  getBicycle(id: number): Bicycle {
    const bicycle = this.data.find(s => s.id === id)
    if (bicycle) {
      return bicycle
    } else {
      throw new Error("Bicycle not found")
    }
  }

  typeService = new TypeService()
  brandService = new BrandService()

  getFullBicycle(id: number): FullBicycle {
    const bicycle: Bicycle | undefined = this.data.find(s => s.id === id)
    if (bicycle) {
      return {
        id: bicycle.id,
        name: bicycle.name,
        value: bicycle.value,
        brand: this.brandService.getBrand(bicycle.brandID).brand,
        type: this.typeService.getTypes([bicycle.typeID])[0].type
      }
    } else {
      throw new Error("Bicycle not found")
    }

  }
}
