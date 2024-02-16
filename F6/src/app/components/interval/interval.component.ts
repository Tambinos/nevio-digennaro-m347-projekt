import {Component} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css']
})
export class IntervalComponent {


  getRandomInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // Observable


  // subscription
  intervalSubscription() {
    const intervalObservable = new Observable<number>(subscriber => {
      let intervalLength: number = this.getRandomInterval(1000, 5000);
      setInterval(() => {
        intervalLength = this.getRandomInterval(1000, 5000);
        subscriber.next(intervalLength);
      }, intervalLength);
    });
    intervalObservable.subscribe({
      next: interval => {
        console.log(`Interval: ${interval}ms`);
      }
    });
  }
}
