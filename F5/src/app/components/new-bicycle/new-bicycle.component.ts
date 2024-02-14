import {Component} from '@angular/core';
import {FullBicycle} from 'src/app/models/FullBicycle';
import {BicycleService} from 'src/app/services/bicycle.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import { BicycleValuePipe } from 'src/app/pipes/bicycle-value.pipe';

@Component({
  selector: 'app-new-bicycle',
  templateUrl: './new-bicycle.component.html',
  styleUrls: ['./new-bicycle.component.scss']
})
export class NewBicycleComponent {
  bicycleService = new BicycleService();
  fullBicycles: FullBicycle[] = [];
  bicyleValuePipe = new BicycleValuePipe();
  static behaviorSubject = new BehaviorSubject<boolean>(false);
  searchBarOnOrOff = NewBicycleComponent.behaviorSubject.getValue();
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
    this.searchBarOnOrOff = NewBicycleComponent.behaviorSubject.getValue();
  }
}
