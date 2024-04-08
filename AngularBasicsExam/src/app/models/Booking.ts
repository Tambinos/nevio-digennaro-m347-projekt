import {Project} from "./Project";
import {TimeCode} from "./TimeCode";

export class Booking {
  project: Project
  date: string
  startTime: number;
  hours: number
  endTime: number = 0;
  timeCode: TimeCode
  lastModified: string = '';


  constructor(project: Project, date: string, hours: number, timeCode: TimeCode, startTime: number) {
    this.project = project;
    this.date = date;
    this.hours = hours;
    this.timeCode = timeCode;
    this.startTime = startTime;
    this.endTime = this.startTime + this.hours;
  }
}
