import {Booking} from "./Booking";

export class Member {
  id: number;
  name: string;
  preName: string;
  username: string;
  password: string;
  department: string;
  bookings: Booking[];
  urlToProfilePicture: string;


  constructor(id: number, name: string, preName: string, username: string, password: string, department: string, bookings: Booking[], urlToProfilePicture: string) {
    this.id = id;
    this.name = name;
    this.preName = preName;
    this.username = username;
    this.password = password;
    this.department = department;
    this.bookings = bookings;
    this.urlToProfilePicture = urlToProfilePicture;
  }

  addBooking(booking: Booking) {
    this.bookings.push(booking);
  }
  // getBookingsTimeByDate(date:string): number {
  //   return this.bookings.filter(booking => booking.date === date).reduce((a, b) => a + b.hours, 0);
  // }
}

