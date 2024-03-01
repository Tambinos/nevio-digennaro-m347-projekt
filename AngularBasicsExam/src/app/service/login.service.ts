import {Injectable} from '@angular/core';
import {Member} from "../entity/Member";
import {Superior} from "../entity/Superior";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  members: Member[] = []
  superiors: Superior[] = []
  adminIds: number[] = [1];

  constructor() {
    if (window.localStorage.getItem('Members')) {
      this.members = JSON.parse(window.localStorage.getItem('Members') ?? '');
    }
    if (window.localStorage.getItem('Superiors')) {
      this.superiors = JSON.parse(window.localStorage.getItem('Superiors') ?? '');
    }
    if (this.members.length === 0) {
      this.members = [
        new Member(1,
          'Max',
          'Mustermann',
          'max',
          '1234',
          'IT',
          [],
          'https://www.w3schools.com/howto/img_avatar.png'),
        new Member(2,
          'Erika',
          'Musterfrau',
          'erika',
          '1234',
          'HR',
          [],
          'https://www.w3schools.com/howto/img_avatar2.png'),
        new Member(3,
          'Hans',
          'Muster',
          'hans',
          '1234',
          'IT',
          [],
          'https://www.w3schools.com/howto/img_avatar1.png'),
      ]
      window.localStorage.setItem('Members', JSON.stringify(this.members));
    }
    if (this.superiors.length === 0) {
      this.superiors = [
        new Superior(4,
          'Alex',
          'Manfred',
          'alex',
          '1234',
          'IT',
          [],
          'https://www.w3schools.com/howto/img_avatar.png',
          [])
      ]
      window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
    }
    window.localStorage.setItem('AdminIds', JSON.stringify(this.adminIds));
  }

  getMembers(): Member[] {
    return JSON.parse(window.localStorage.getItem('Members') ?? '')
  }

  setMembers(user: Member[] | Superior[]) {
    window.localStorage.setItem('Members', JSON.stringify(user));
    this.updateSuperiorsMembers();
  }

  addMember(member: Member) {
    this.members.push(member);
    window.localStorage.setItem('Members', JSON.stringify(this.members));
    this.updateSuperiorsMembers();
  }

  removeMember(id: number) {
    this.members = this.members.filter(member => member.id !== id);
    window.localStorage.setItem('Members', JSON.stringify(this.members));
    this.updateSuperiorsMembers();
  }

  replaceSuperiorMember(id: number, newMember: Member | Superior) {
    if (!(newMember instanceof Superior)) {
      this.members[this.members.indexOf(this.getById(newMember.id) as Member)] = newMember
      this.setMembers(this.members);
    } else {
      this.superiors[this.superiors.indexOf(this.getById(newMember.id) as Superior)] = newMember
      this.setSuperiors(this.superiors);
    }
    this.updateSuperiorsMembers();
  }

  getSuperiors(): Superior[] {
    return JSON.parse(window.localStorage.getItem('Superiors') ?? '');
  }

  setSuperiors(user: Superior[]) {
    window.localStorage.setItem('Superiors', JSON.stringify(user));
  }

  addSuperior(superior: Superior) {
    this.superiors.push(superior);
    window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
  }

  removeSuperior(id: number) {
    this.superiors = this.superiors.filter(superior => superior.id !== id);
    window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
  }

  removeSuperiorMember(id: number, memberId: number) {
    this.superiors
      .find(superior => superior.id === id)?.members
      .splice(this.superiors.
      find(superior => superior.id === id)?.members.
      findIndex(member => member.id === memberId) as number, 1);
    window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
  }

  addSuperiorMember(id: number, memberId: number) {
    if (this.getSuperiors().find(superior => superior.id === id)?.members.filter(member => member.id === memberId).length === 0) {
      this.superiors.find(superior => superior.id === id)?.members.push(this.getById(memberId) as Member);
      window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
    }else {
      alert('Member already in Superior');
    }
  }

  isSuperior(id: number): Superior {
    return this.superiors.find(superior => superior.id === id) as Superior;
  }

  updateSuperiorsMembers() {
    for (let i = 0; i < this.superiors.length; i++) {
      for (let j = 0; j < this.superiors[i].members.length; j++) {
        if (this.getById(this.superiors[i].members[j].id) === undefined) {
          this.superiors[i].members.splice(j, 1);
        } else {
          this.superiors[i].members[j] = this.getById(this.superiors[i].members[j].id) as Member;
        }
      }
    }
    window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
  }

  getLoggedInUserId(): number {
    return JSON.parse(window.localStorage.getItem('LoggedInUserId') ? JSON.parse(window.localStorage.getItem('LoggedInUserId') ?? '') : -1);
  }

  setLoggedInUserId(id: number) {
    window.localStorage.setItem('LoggedInUserId', JSON.stringify(id));
  }

  getFocusedUserId(): number {
    return JSON.parse(window.localStorage.getItem('FocusedUserId') ?? '-1')
  }


  setFocusedUserId(id: number) {
    window.localStorage.setItem('FocusedUserId', JSON.stringify(id));
  }

  getById(id: number): Member | Superior {
    // @ts-ignore
    return this.members.find(member => member.id === id) ?? this.superiors.find(superior => superior.id === id);
  }

  getAdminIds(): number[] {
    return JSON.parse(window.localStorage.getItem('AdminIds') ?? '[]');
  }

  setAdminIds(ids: number[]) {
    window.localStorage.setItem('AdminIds', JSON.stringify(ids));
  }
}
