import {Injectable} from '@angular/core';
import {Member} from "../entity/Member";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private members: Member[] = [
    new Member(
      1,
      "Mustermann",
      "Max",
      "max.mustermann",
      "1234",
      "IT",
      40,
      "https://www.w3schools.com/howto/img_avatar.png"),
    new Member(
      2,
      "Musterfrau",
      "Erika",
      "erika.musterfrau",
      "1234", "HR", 40,
      "https://www.w3schools.com/howto/img_avatar.png"),
  ];

  getMembers(): Member[] {
    return this.members;
  }

  private loggedInUser: Member | null = null;

  getLoggedInUser(): Member | null {
    return this.loggedInUser;
  }
  setLoggedInUser(member: Member): void {
    this.loggedInUser = member;
  }
  getMemberById(id: number): Member  {
    // @ts-ignore
    return this.members.find(member => member.id === id);
  }
}
