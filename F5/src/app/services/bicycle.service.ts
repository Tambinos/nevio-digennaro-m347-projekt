import {Injectable} from '@angular/core'
import {Bicycle} from "../models/Bicycle"
import { TypeService } from './type.service'
import { BrandService } from './brand.service'
import { FullBicycle } from '../models/FullBicycle'
@Injectable({
  providedIn: 'root'
})

export class BicycleService {

  private data: Bicycle[] = [
    new Bicycle(1, "Hans", 1000, 1, 1),
    new Bicycle(2, "Jakob", 10000, 2, 2),
    new Bicycle(3, "Jens", 100000000, 3, 3)
  ]

  getAllBicycles(): Bicycle[] {
    return this.data
  }

  getBicycle(id: number): Bicycle {
    // @ts-ignore
    return this.data.find(s => s.id === id)
  }
  typeService = new TypeService()
  brandService = new BrandService()

  getfullBicycle(id: number): FullBicycle {
    if (!(this.data.find(s => s.id === id) === undefined)) {
      // @ts-ignore
      let bicycle: Bicycle = this.data.find(s => s.id === id)
      let fullBicycle :FullBicycle = new FullBicycle(bicycle.id, bicycle.name, bicycle.value,
        this.brandService.getBrandName(bicycle.brandID), this.typeService.getTypesName(Array.of(bicycle.typeID))[0])
      return fullBicycle
    }else {
      throw new Error("Bicycle not found")
    }
  }
}
