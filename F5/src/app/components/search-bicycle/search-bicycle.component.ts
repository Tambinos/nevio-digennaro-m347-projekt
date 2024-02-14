import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FullBicycle} from 'src/app/models/FullBicycle';
import { BicycleValuePipe } from 'src/app/pipes/bicycle-value.pipe';
import {BicycleService} from 'src/app/services/bicycle.service';

@Component({
  selector: 'app-search-bicycle',
  templateUrl: './search-bicycle.component.html',
  styleUrls: ['./search-bicycle.component.scss']
})
export class SearchBicycleComponent {
  formsControl = new FormControl();
  bicycleService = new BicycleService();
  fullBicycles: FullBicycle[] = [];

  constructor() {
    this.fullBicycles = this.bicycleService.getAllBicycles().map(bicycle =>
      this.bicycleService.getfullBicycle(bicycle.id)
    );
    this.formsControl.valueChanges.subscribe(value => {
      this.fullBicycles = this.bicycleService.getAllBicycles().map(bicycle =>
        this.bicycleService.getfullBicycle(bicycle.id)
      );
      this.fullBicycles = this.fullBicycles.filter(bicycle => bicycle.name.includes(value));
    })
  }
}
