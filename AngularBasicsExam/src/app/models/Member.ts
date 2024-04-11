import { Booking } from './Booking';

export interface Member {
  id: number;
  name: string;
  preName: string;
  username: string;
  password: string;
  department: string;
  bookings: Booking[];
  urlToProfilePicture: string;
}
