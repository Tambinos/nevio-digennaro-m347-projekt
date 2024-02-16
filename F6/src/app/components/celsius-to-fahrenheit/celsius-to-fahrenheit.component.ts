import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {CelsiusToFahrenheitPipe} from "../../pipes/celsius-to-fahrenheit.pipe";

@Component({
  selector: 'app-celsius-to-fahrenheit',
  templateUrl: './celsius-to-fahrenheit.component.html',
  styleUrls: ['./celsius-to-fahrenheit.component.css']
})
export class CelsiusToFahrenheitComponent {
  getRandomDegree(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  temperatureInC = new Observable<number>((subscriber) => {
    setInterval(() => {
      subscriber.next(this.getRandomDegree(0, 45));
    }, 2000);
  });
  convertCelsiusToFahrenheit() {
    this.temperatureInC.subscribe((celsius) => {
      console.log(`Celsius: ${celsius} Fahrenheit: ${new CelsiusToFahrenheitPipe().transform(celsius)}`);
    });
  }
}
