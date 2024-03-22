import {Component} from "@angular/core";
import {BicycleService} from "../../services/bicycle.service";
import {FullBicycle} from "../../models/FullBicycle";
import {BicycleValuePipe} from "../../pipes/bicycle-value.pipe";
import {BehaviorSubject} from "rxjs";
import {FormControl, FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-new-bicycle',
  templateUrl: './new-bicycle.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    FormsModule,
    BicycleValuePipe
  ],
  styleUrls: ['./new-bicycle.component.scss']
})
export class NewBicycleComponent {
  bicycleService = new BicycleService();
  fullBicycles: FullBicycle[] = [];
  bicyleValuePipe = new BicycleValuePipe();
  static behaviorSubject = new BehaviorSubject<boolean>(false);
  searchOnOrOff = NewBicycleComponent.behaviorSubject.getValue();
  formsControl = new FormControl();
  brandId: string = "";
  router = new Router();

  constructor() {
    // Use map to create FullBicycle objects directly
    this.fullBicycles = this.bicycleService.getAllBicycles().map(bicycle =>
      this.bicycleService.getfullBicycle(bicycle.id)
    );
    NewBicycleComponent.behaviorSubject.subscribe(value => {
      if (value) {
        this.router.navigate(['/SearchBicycleComponent']);
      } else {
        this.router.navigate([""]);
      }
    })
    this.formsControl.valueChanges.subscribe(value => {
      this.fullBicycles = this.bicycleService.getAllBicycles().map(bicycle =>
        this.bicycleService.getfullBicycle(bicycle.id)
      );
      this.fullBicycles = this.fullBicycles.filter(bicycle => bicycle.name.includes(value));
    })
  }


  updateBehaviorSubejct() {
    NewBicycleComponent.behaviorSubject.next(!NewBicycleComponent.behaviorSubject.getValue());
    this.searchOnOrOff = NewBicycleComponent.behaviorSubject.getValue();
  }
}
