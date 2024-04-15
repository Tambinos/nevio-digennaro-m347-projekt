import { Component } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { NgForOf } from '@angular/common';
import { Member } from '../../models/Member';
import { Superior } from '../../models/Superior';
import { RoleService } from '../../service/role.service';
import { Booking } from '../../models/Booking';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/Project';
import { TimeCode } from '../../models/TimeCode';
import { TimeCodeService } from '../../service/time-code.service';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../service/booking.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-bookingcreation',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterLink, MatButton],
  templateUrl: './bookingcreation.component.html',
  styleUrl: './bookingcreation.component.css',
})
export class BookingcreationComponent {
  projects: Project[];
  timeCodes: TimeCode[];
  focusedUser: Member | Superior;
  endTimes: string[] = [];
  startTimes: string[] = [];
  date: string = '';
  project: string | undefined;
  timeCode?: string;

  constructor(
    private projectservice: ProjectService,
    private loginService: RoleService,
    private timeCodeService: TimeCodeService,
    private router: Router,
    private bookingService: BookingService,
  ) {
    this.projects = this.projectservice.getProjects();
    this.timeCodes = this.timeCodeService.getTimeCodes();
    let user = this.loginService.getById(this.loginService.getFocusedUserId());
    if (!user) {
      this.router.navigate(['/login']);
    }
    this.focusedUser = user as Member | Superior;
    this.date = this.bookingService.deFormatDate(
      this.bookingService.getFocusedDate(),
    );
    this.endTimes = ['0'];
    this.startTimes = ['0'];
  }

  addEndAndStartTime() {
    this.endTimes.push('0');
    this.startTimes.push('0');
  }

  removeEndAndStartTime() {
    this.endTimes.pop();
    this.startTimes.pop();
  }

  createBooking() {
    for (let i = 0; i < this.endTimes.length; i++) {
      const newBooking: Booking = {
        project: this.projects.find(
          (project) => project.name === this.project,
        ) ?? { name: 'No Project' },
        date: this.bookingService.formatDate(this.date),
        hours:
          this.bookingService.calcTime(this.endTimes[i]) -
          this.bookingService.calcTime(this.startTimes[i]),
        timeCode: this.timeCodes.find(
          (timeCode) => timeCode.name === this.timeCode,
        ) ?? {
          name: 'No TimeCode',
          color: '#FFFFFF',
        },
        startTime: this.bookingService.calcTime(this.startTimes[i]),
        endTime: this.bookingService.calcTime(this.endTimes[i]),
      };
      const newBookings = [...this.focusedUser.bookings];
      newBookings.push(newBooking);
      if (
        this.bookingService.checkForOverlappingBookings(
          newBookings,
          this.bookingService.formatDate(this.date),
        ) &&
        this.bookingService.checkLunch(
          newBookings,
          this.bookingService.formatDate(this.date),
        )
      ) {
        this.focusedUser.bookings = newBookings;
        window.alert('Booking created successfully');
        this.loginService.replaceSuperiorMember(this.focusedUser);
      }
    }
  }
}
