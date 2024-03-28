import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Component} from "@angular/core";
import {BicycleService} from "../../services/bicycle.service";
import {FullBicycle} from "../../models/FullBicycle";
import {BicycleValuePipe} from "../../pipes/bicycle-value.pipe";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-search-bicycle',
  templateUrl: './search-bicycle.component.html',
  standalone: true,
  imports: [
    BicycleValuePipe,
    ReactiveFormsModule,
    MatButton,
    RouterLink
  ],
  styleUrls: ['./search-bicycle.component.scss']
})
export class SearchBicycleComponent {
  formsControl = new FormControl();
  bicycleService = new BicycleService();
  fullBicycles: FullBicycle[] = [];

  constructor() {
    this.fullBicycles = this.bicycleService.getAllBicycles().map(bicycle =>
      this.bicycleService.getFullBicycle(bicycle.id)
    );
    this.formsControl.valueChanges.subscribe(value => {
      this.fullBicycles = this.bicycleService.getAllBicycles().map(bicycle =>
        this.bicycleService.getFullBicycle(bicycle.id)
      );
      this.fullBicycles = this.fullBicycles.filter(bicycle => bicycle.name.includes(value));
    })
  }
}
