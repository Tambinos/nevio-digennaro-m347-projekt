import { Injectable } from '@angular/core';
import { Member } from '../models/Member';
import { Superior } from '../models/Superior';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  members: Member[] = [];
  superiors: Superior[] = [];
  adminIds: number[] = [1];

  constructor() {
    const defaultImgUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5WUQuWuiVupvr6lctXQnPjxrik229AYnLkA&s';
    if (window.localStorage.getItem('Members')) {
      this.members = JSON.parse(window.localStorage.getItem('Members') ?? '');
    }
    if (window.localStorage.getItem('Superiors')) {
      this.superiors = JSON.parse(
        window.localStorage.getItem('Superiors') ?? '',
      );
    }
    if (this.members.length === 0) {
      this.members = [
        {
          id: 1,
          preName: 'Max',
          name: 'Mustermann',
          username: 'max',
          password: '12345',
          department: 'IT',
          bookings: [],
          urlToProfilePicture: defaultImgUrl,
        },
        {
          id: 2,
          preName: 'Erika',
          name: 'Mustermann',
          username: 'erika',
          password: '12345',
          department: 'IT',
          bookings: [],
          urlToProfilePicture: defaultImgUrl,
        },
      ];
      window.localStorage.setItem('Members', JSON.stringify(this.members));
    }
    if (this.superiors.length === 0) {
      this.superiors = [
        {
          id: 4,
          preName: 'Alex',
          name: 'Manfred',
          username: 'alex',
          password: '12345',
          department: 'IT',
          bookings: [],
          urlToProfilePicture: defaultImgUrl,
          members: [],
        },
      ];
      window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
    }
    window.localStorage.setItem('AdminIds', JSON.stringify(this.adminIds));
  }

  getMembers(): Member[] {
    return JSON.parse(window.localStorage.getItem('Members') ?? '');
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
    this.members = this.members.filter((member) => member.id !== id);
    window.localStorage.setItem('Members', JSON.stringify(this.members));
    this.updateSuperiorsMembers();
  }

  replaceSuperiorMember(newMember: Member | Superior) {
    console.log(this.getMembers());
    if (this.isSuperior(newMember.id) === undefined) {
      const memberIndex = this.members.findIndex(
        (member) => member.id === newMember.id,
      );
      if (memberIndex !== -1) {
        this.members[memberIndex] = newMember;
        this.setMembers(this.members);
      }
    } else {
      const superiorIndex = this.superiors.findIndex(
        (superior) => superior.id === newMember.id,
      );
      if (superiorIndex !== -1) {
        this.superiors[superiorIndex] = newMember as Superior;
        this.setSuperiors(this.superiors);
      }
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
    this.superiors = this.superiors.filter((superior) => superior.id !== id);
    window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
  }

  removeSuperiorMember(id: number, memberId: number) {
    this.superiors
      .find((superior) => superior.id === id)
      ?.members.splice(
        this.superiors
          .find((superior) => superior.id === id)
          ?.members.findIndex((member) => member.id === memberId) as number,
        1,
      );
    window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
  }

  addSuperiorMember(id: number, memberId: number) {
    if (
      this.getSuperiors()
        .find((superior) => superior.id === id)
        ?.members.filter((member) => member.id === memberId).length === 0
    ) {
      this.superiors
        .find((superior) => superior.id === id)
        ?.members.push(this.getById(memberId) as Member);
      this.setSuperiors(this.superiors);
    } else {
      alert('Member already in Superior');
    }
  }

  isSuperior(id: number): Superior {
    return this.superiors.find((superior) => superior.id === id) as Superior;
  }

  updateSuperiorsMembers() {
    for (let i = 0; i < this.superiors.length; i++) {
      for (let j = 0; j < this.superiors[i].members.length; j++) {
        if (this.getById(this.superiors[i].members[j].id) === undefined) {
          this.superiors[i].members.splice(j, 1);
        } else {
          this.superiors[i].members[j] = this.getById(
            this.superiors[i].members[j].id,
          ) as Member;
        }
      }
    }
    window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
  }

  getLoggedInUserId(): number {
    return JSON.parse(window.localStorage.getItem('LoggedInUserId') ?? '-1');
  }

  setLoggedInUserId(id: number) {
    window.localStorage.setItem('LoggedInUserId', JSON.stringify(id));
  }

  getFocusedUserId(): number {
    return JSON.parse(window.localStorage.getItem('FocusedUserId') ?? '-1');
  }

  setFocusedUserId(id: number) {
    window.localStorage.setItem('FocusedUserId', JSON.stringify(id));
  }

  getById(id: number): Member | Superior | undefined {
    let members = this.members.find((member) => member.id === id);
    let superior = this.superiors.find((superior) => superior.id === id);
    if (members === undefined) {
      return superior as Superior;
    } else {
      return members as Member;
    }
  }

  getAdminIds(): number[] {
    return JSON.parse(window.localStorage.getItem('AdminIds') ?? '[]');
  }
}
