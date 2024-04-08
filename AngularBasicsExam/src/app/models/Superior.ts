import {Member} from "./Member";
import {Booking} from "./Booking";

export class Superior extends Member  {
  members: Member[] = [];


  constructor(id: number, name: string, preName: string, username: string, password: string, department: string, bookings: Booking[], urlToProfilePicture: string, members: Member[]) {
    super(id, name, preName, username, password, department, bookings, urlToProfilePicture);
    this.members = members;
  }
}

