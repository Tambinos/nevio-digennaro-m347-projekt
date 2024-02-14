import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FullBicycle } from 'src/app/models/FullBicycle';
import { BicycleService } from 'src/app/services/bicycle.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  // @ts-ignore
  brandId: number;
  brandService:BrandService = new BrandService();
  bicycleService:BicycleService = new BicycleService();
  fullBicycles: FullBicycle[] = [];


  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.brandId = parseInt(params['brandId']);
    });
    this.fullBicycles = this.bicycleService.getAllBicycles().map(bicycle =>
      this.bicycleService.getfullBicycle(bicycle.id)
    ).filter(bicycle => bicycle.brand === this.brandService.getBrandName(this.brandId));
  }

  getBrandName():string{
    if (this.brandId > 0 && this.brandId <= this.brandService.getBrands().length) {
      return this.brandService.getBrandName(this.brandId);
    }
    return "Brand not found";
  }
}
