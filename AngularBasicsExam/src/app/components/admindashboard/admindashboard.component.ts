import {Component} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Member} from "../../entity/Member";
import {Superior} from "../../entity/Superior";
import {Router, RouterLink} from "@angular/router";
import {Booking} from "../../entity/Booking";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {TimeCodeService} from "../../service/time-code.service";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../entity/Project";
import {TimeCode} from '../../entity/TimeCode';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  // @ts-ignore
  activeUser: Member | Superior
  roles: string[] = ['Member', 'Superior'];
  selectedRole: string = 'Member';
  name: string = 'Mustermann';
  preName: string = 'Max'
  username: string = 'max.mustermann';
  password: string = '1234';
  department: string = 'IT';
  bookings: Booking[] = [];
  urlToProfilePicture: string = 'https://www.w3schools.com/howto/img_avatar.png';
  timeCodeName: string = '';
  timeCodeColor: string = '';
  projectName: string = '';
  members: Member[] = this.loginService.getMembers();
  superiors: Superior[] = this.loginService.getSuperiors();
  allMembers: (Member | Superior)[] = this.members.concat(this.superiors);
  index: number = 0;
  membersWithOutUser: Member[]
  memberToAddName = 'Select Member to Add';

  nextMember() {
    if (this.index < this.allMembers.length - 1) {
      this.index++;
    }
  }

  previousMember() {
    if (this.index > 0) {
      this.index--;
    }
  }

  constructor(protected loginService: LoginService,
              private router: Router,
              private projectService: ProjectService,
              private timeCodeService: TimeCodeService) {
    if (!(this.loginService.getById(this.loginService.getLoggedInUserId()))) {
      router.navigate(['/login']);
    }
    this.activeUser = this.loginService.getById(this.loginService.getLoggedInUserId());
    if (!(this.loginService.getAdminIds().includes(this.activeUser.id))) {
      alert('GET BACK TO WORK!');
      router.navigate(['/dashboard']);
    }
    this.membersWithOutUser = this.members.filter(member => member.id !== this.members[this.index].id);
  }

  addMember() {
    let newUser;
    if (this.selectedRole === 'Member') {
      newUser = new Member(
        this.loginService.getMembers().length + this.loginService.getSuperiors().length + 1,
        this.name,
        this.preName,
        this.username,
        this.password,
        this.department,
        this.bookings,
        this.urlToProfilePicture
      )
      this.loginService.addMember(newUser);
    } else {
      newUser = new Superior(
        this.loginService.getSuperiors().length + this.loginService.getMembers().length + 1,
        this.name,
        this.preName,
        this.username,
        this.password,
        this.department,
        this.bookings,
        this.urlToProfilePicture,
        []
      )
      this.loginService.addSuperior(newUser);
    }
  }

  createProject() {
    this.projectService.addProject(new Project(this.projectName));
  }

  createTimeCode() {
    this.timeCodeService.addTimeCode(new TimeCode(this.timeCodeName, this.timeCodeColor));
  }

  getSelectedMemberToAdd() {
    return this.members.filter(member => member.username === this.memberToAddName)[0];
  }

  changeAttribute(attribute: string) {
    // @ts-ignore
    this.allMembers[this.index][attribute] = prompt('Enter new ' + attribute + ' for ' + this.members[this.index].username);
    this.loginService.replaceSuperiorMember(this.allMembers[this.index].id, this.allMembers[this.index]);
  }
}
