import { Member } from './Member';
import { Booking } from './Booking';

export interface Superior extends Member {
  id: number;
  name: string;
  preName: string;
  username: string;
  password: string;
  department: string;
  bookings: Booking[];
  urlToProfilePicture: string;
  members: Member[];
}
