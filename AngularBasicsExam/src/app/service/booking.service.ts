import { Injectable } from '@angular/core';
import { Booking } from '../entity/Booking';
import { TimeCodeService } from './time-code.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  bookings: Booking[] = [];

  constructor(protected timeCodeService: TimeCodeService) {}

  setFocusedDate(date: string) {
    window.localStorage.setItem('date', date);
  }

  getFocusedDate(): string {
    if (window.localStorage.getItem('date')) {
      // @ts-ignore
      return window.localStorage.getItem('date');
    } else {
      throw new Error('No date selected.');
    }
  }

  getFocusedBooking(): Booking {
    if (window.localStorage.getItem('focusedBooking')) {
      // @ts-ignore
      return JSON.parse(window.localStorage.getItem('focusedBooking'));
    } else {
      throw new Error('No Booking selected.');
    }
  }

  setFocusedBooking(booking: Booking) {
    window.localStorage.setItem('focusedBooking', JSON.stringify(booking));
  }

  formatDate(date: string): string {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    if (month.charAt(0) === '0') {
      month = month.substring(1);
    }
    let day = date.substring(8, 10);
    if (day.charAt(0) === '0') {
      day = day.substring(1);
    }
    return day + '.' + month + '.' + year;
  }

  deFormatDate(date: string): string {
    let dateArray = date.split('.');
    let day = dateArray[0];
    if (Number.parseInt(day) < 10) {
      day = '0' + day;
    }
    let month = dateArray[1];
    if (Number.parseInt(month) < 10) {
      month = '0' + month;
    }
    let year = dateArray[2];
    return year + '-' + month + '-' + day;
  }

  getIndexOfFocusedBooking(): number {
    // @ts-ignore
    return JSON.parse(window.localStorage.getItem('focusedBookingIndex'));
  }

  setIndexOfFocusedBooking(index: number) {
    window.localStorage.setItem('focusedBookingIndex', JSON.stringify(index));
  }

  checkLunch(bookings: Booking[], date: string) {
    bookings = bookings
      .filter((booking) => booking.date === date)
      .sort((a, b) => a.startTime - b.startTime);

    let totalWorkedHours = bookings.reduce((acc, curr) => acc + curr.hours, 0);
    let workDayStart = bookings[0].startTime;
    let workDayEnd = bookings[bookings.length - 1].endTime;

    let totalDaySpan = workDayEnd - workDayStart;
    let totalBreakTime = totalDaySpan - totalWorkedHours;

    if (totalWorkedHours > 9) {
      if (totalBreakTime > 1) {
        return true;
      } else {
        alert('Needs to take 1 Hour for lunch.\n Changes not saved.');
        return false;
      }
    } else if (totalWorkedHours > 5) {
      if (totalBreakTime > 0.5) {
        return true;
      } else {
        alert('Needs to take 30 Minutes for lunch.\n Changes not saved.');
        return false;
      }
    }
    return true;
  }
  checkForOverlappingBookings(bookings: Booking[], date: string): boolean {
    bookings = bookings
      .filter((booking) => booking.date === date)
      .sort((a, b) => a.startTime - b.startTime);
    for (let i = 0; i < bookings.length - 1; i++) {
      if (bookings[i].endTime > bookings[i + 1].startTime) {
        alert('Overlapping Bookings\n Changes not saved.');
        return false;
      }
    }
    return true;
  }

  calcTime(startTimeString: string) {
    let hour = startTimeString.substring(0, 2);
    let min = startTimeString.substring(3, 5);
    return parseInt(hour) + parseInt(min) / 60;
  }

  calcTimeString(time: number) {
    let hour = Math.floor(time);
    let min = Math.round((time - hour) * 60);
    if (min < 10) {
      return hour.toString() + ':0' + min.toString();
    }
    return hour.toString() + ':' + min.toString();
  }
}
