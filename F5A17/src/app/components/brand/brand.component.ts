import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {BrandService} from "../../services/brand.service";
import {BicycleService} from "../../services/bicycle.service";
import {FullBicycle} from "../../models/FullBicycle";
import {BrandCopyrightPipe} from "../../pipes/brand-copyright.pipe";
import {BicycleValuePipe} from "../../pipes/bicycle-value.pipe";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  standalone: true,
  imports: [
    BrandCopyrightPipe,
    BicycleValuePipe,
    RouterLink,
    MatButton,
  ],
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
