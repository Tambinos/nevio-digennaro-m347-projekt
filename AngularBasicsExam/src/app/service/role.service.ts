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
      'data:image/jpeg;base64,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';
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
        new Member(
          1,
          'Max',
          'Mustermann',
          'max',
          '1234',
          'IT',
          [],
          defaultImgUrl,
        ),
        new Member(
          2,
          'Erika',
          'Musterfrau',
          'erika',
          '1234',
          'HR',
          [],
          defaultImgUrl,
        ),
        new Member(
          3,
          'Hans',
          'Muster',
          'hans',
          '1234',
          'IT',
          [],
          defaultImgUrl,
        ),
      ];
      window.localStorage.setItem('Members', JSON.stringify(this.members));
    }
    if (this.superiors.length === 0) {
      this.superiors = [
        new Superior(
          4,
          'Alex',
          'Manfred',
          'alex',
          '1234',
          'IT',
          [],
          defaultImgUrl,
          [],
        ),
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

  replaceSuperiorMember(id: number, newMember: Member | Superior) {
    if (!(newMember instanceof Superior)) {
      this.members[this.members.indexOf(this.getById(newMember.id) as Member)] =
        newMember;
      this.setMembers(this.members);
    } else {
      this.superiors[
        this.superiors.indexOf(this.getById(newMember.id) as Superior)
      ] = newMember;
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
      window.localStorage.setItem('Superiors', JSON.stringify(this.superiors));
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
    return JSON.parse(
      window.localStorage.getItem('LoggedInUserId')
        ? JSON.parse(window.localStorage.getItem('LoggedInUserId') ?? '')
        : -1,
    );
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

  getById(id: number): Member | Superior {
    // @ts-ignore
    return (
      this.members.find((member) => member.id === id) ??
      this.superiors.find((superior) => superior.id === id)
    );
  }

  getAdminIds(): number[] {
    return JSON.parse(window.localStorage.getItem('AdminIds') ?? '[]');
  }
}
