import { Component } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { Member } from '../../models/Member';
import { Superior } from '../../models/Superior';
import { Router, RouterLink } from '@angular/router';
import { Booking } from '../../models/Booking';
import { FormsModule } from '@angular/forms';
import {
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { TimeCodeService } from '../../service/time-code.service';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    NgIf,
    NgSwitchCase,
    NgSwitch,
    NgSwitchDefault,
  ],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  activeUser: Member | Superior;
  roles: string[] = ['Member', 'Superior'];
  selectedRole: string = 'Member';
  name: string = 'Mustermann';
  preName: string = 'Max';
  password: string = '1234';
  department: string = 'IT';
  bookings: Booking[] = [];
  urlToProfilePicture: string =
    'https://www.w3schools.com/howto/img_avatar.png';
  timeCodeName: string = '';
  timeCodeColor: string = '';
  projectName: string = '';
  members: Member[] = this.loginService.getMembers();
  superiors: Superior[] = this.loginService.getSuperiors();
  allMembers: (Member | Superior)[] = [];
  index: number = 0;
  membersWithOutUser: Member[];
  memberToAddName: string = 'Select Member to Add';
  actionIndex: number = 0;

  constructor(
    protected loginService: RoleService,
    private router: Router,
    private projectService: ProjectService,
    private timeCodeService: TimeCodeService,
  ) {
    let user: Member | Superior | undefined = this.loginService.getById(
      this.loginService.getLoggedInUserId(),
    );
    if (!user) {
      router.navigate(['/login']);
    }
    this.activeUser = user as Member | Superior;
    this.activeUser = user as Member | Superior;
    if (!this.loginService.getAdminIds().includes(this.activeUser.id)) {
      alert('GET BACK TO WORK!');
      router.navigate(['/dashboard']);
    }
    this.membersWithOutUser = this.members.filter(
      (member) => member.id !== this.members[this.index].id,
    );
    this.allMembers.push(...this.members);
    this.allMembers.push(...this.superiors);
  }

  nextAction() {
    this.actionIndex++;
  }

  previousAction() {
    this.actionIndex--;
  }

  nextMember() {
    if (this.index < this.allMembers.length - 1) {
      this.index++;
    }
  }

  redefineAllMembers() {
    this.members = this.loginService.getMembers();
    this.superiors = this.loginService.getSuperiors();
    this.allMembers = this.members.concat(this.superiors);
  }

  previousMember() {
    if (this.index > 0) {
      this.index--;
    }
  }

  getId() {
    if (this.allMembers[this.index]) {
      return this.allMembers[this.index].id;
    } else {
      throw new Error('No Members');
    }
  }

  deleteMember() {
    this.loginService.removeMember(this.allMembers[this.index].id);
    this.index = 0;
    this.redefineAllMembers();
  }

  deleteSuperior() {
    this.loginService.removeSuperior(this.allMembers[this.index].id);
    this.index = 0;
    this.redefineAllMembers();
  }

  addMember() {
    let newUser;
    if (this.selectedRole === 'Member') {
      newUser = {
        id:
          this.loginService.getMembers().length +
          this.loginService.getSuperiors().length +
          1,
        name: this.name,
        preName: this.preName,
        username: this.preName.toLowerCase(),
        password: this.password,
        department: this.department,
        bookings: this.bookings,
        urlToProfilePicture: this.urlToProfilePicture,
      };
      this.loginService.addMember(newUser);
    } else {
      newUser = {
        id:
          this.loginService.getSuperiors().length +
          this.loginService.getMembers().length +
          1,
        name: this.name,
        preName: this.preName,
        username: (this.preName + '.' + this.name).toLowerCase(),
        password: this.password,
        department: this.department,
        bookings: this.bookings,
        urlToProfilePicture: this.urlToProfilePicture,
        members: [],
      };
      this.loginService.addSuperior(newUser);
    }
  }

  createProject() {
    this.projectService.addProject({ name: this.projectName });
  }

  createTimeCode() {
    this.timeCodeService.addTimeCode({
      name: this.timeCodeName,
      color: this.timeCodeColor,
    });
  }

  getSelectedMemberToAdd(): Member {
    return this.members.filter(
      (member) => member.username === this.memberToAddName,
    )[0];
  }

  changeAttribute(attribute: string) {
    // @ts-ignore
    this.allMembers[this.index][attribute] = prompt(
      'Enter new ' + attribute + ' for ' + this.members[this.index].username,
    );
    this.loginService.replaceSuperiorMember(this.allMembers[this.index]);
  }
}
