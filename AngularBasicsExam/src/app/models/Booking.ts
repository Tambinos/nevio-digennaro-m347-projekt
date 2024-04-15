import { Project } from './Project';
import { TimeCode } from './TimeCode';

export interface Booking {
  project: Project;
  date: string;
  startTime: number;
  endTime: number;
  hours: number;
  timeCode: TimeCode;
  lastModified?: string;
}
