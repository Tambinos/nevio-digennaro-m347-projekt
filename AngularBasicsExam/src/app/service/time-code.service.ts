import {Injectable} from '@angular/core';
import {TimeCode} from "../entity/TimeCode";
import {Time} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TimeCodeService {
  timeCodes: TimeCode[]

  getTimeCodes(): TimeCode[] {
    this.timeCodes = JSON.parse(window.localStorage.getItem('TimeCodes') ?? '');
    return this.timeCodes
  }
  addTimeCode(timeCode: TimeCode) {
    this.timeCodes.push(timeCode);
    window.localStorage.setItem('TimeCodes', JSON.stringify(this.timeCodes));
  }
  constructor() {
    if (window.localStorage.getItem('TimeCodes')) {
      this.timeCodes = JSON.parse(window.localStorage.getItem('TimeCodes') ?? '');
    } else {
      this.timeCodes = [
        new TimeCode('Projektarbeit', '#FF7F00'),
        new TimeCode('Krank', '#FF7F7F'),
        new TimeCode('Schulung', '#7F7FFF'),
        new TimeCode('Ferien', '#90EE90'),
      ]
    }
    window.localStorage.setItem('TimeCodes', JSON.stringify(this.timeCodes));
  }
}
