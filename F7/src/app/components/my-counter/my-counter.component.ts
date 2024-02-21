import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {initialState} from "../../counter.reducer";
@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent {
  counterObservable = new Observable<number>(subscriber => {
    setInterval(() => {
      subscriber.next(initialState);
    }, 1000);
  })
  onInit() {
    this.counterObservable.subscribe(value => {
      console.log(value);
    });
  }
}
