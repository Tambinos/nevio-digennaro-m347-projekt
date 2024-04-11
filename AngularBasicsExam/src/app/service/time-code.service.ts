import { Injectable } from '@angular/core';
import { TimeCode } from '../models/TimeCode';

@Injectable({
  providedIn: 'root',
})
export class TimeCodeService {
  timeCodes: TimeCode[];

  getTimeCodes(): TimeCode[] {
    this.timeCodes = JSON.parse(window.localStorage.getItem('TimeCodes') ?? '');
    return this.timeCodes;
  }

  addTimeCode(timeCode: TimeCode) {
    this.timeCodes.push(timeCode);
    window.localStorage.setItem('TimeCodes', JSON.stringify(this.timeCodes));
  }

  constructor() {
    if (window.localStorage.getItem('TimeCodes')) {
      this.timeCodes = JSON.parse(
        window.localStorage.getItem('TimeCodes') ?? '',
      );
    } else {
      this.timeCodes = [
        {
          name: 'Projektarbeit',
          color: '#FF7F00',
        },
        {
          name: 'Krank',
          color: '#FF7F7F',
        },
        {
          name: 'Schulung',
          color: '#7F7FFF',
        },
        {
          name: 'Ferien',
          color: '#90EE90',
        },
      ];
    }
    window.localStorage.setItem('TimeCodes', JSON.stringify(this.timeCodes));
  }
}
