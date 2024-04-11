import { Component } from '@angular/core';
import { BookingService } from '../../service/booking.service';
import { TimeCodeService } from '../../service/time-code.service';
import { ProjectService } from '../../service/project.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { Project } from '../../models/Project';
import { TimeCode } from '../../models/TimeCode';
import { RoleService } from '../../service/role.service';
import { Superior } from '../../models/Superior';
import { Member } from '../../models/Member';

@Component({
  selector: 'app-editbooking',
  standalone: true,
  imports: [NgForOf, RouterLink, FormsModule],
  templateUrl: './editbooking.component.html',
  styleUrl: './editbooking.component.css',
})
export class EditbookingComponent {
  focusedBooking: Booking;
  timeCodes: TimeCode[];
  projects: Project[];
  date: string;
  startTime: string;
  hours: number;
  project: string;
  timeCode: string;

  constructor(
    protected bookingService: BookingService,
    protected timeCodeService: TimeCodeService,
    protected projectService: ProjectService,
    protected loginService: RoleService,
  ) {
    this.focusedBooking = this.bookingService.getFocusedBooking();
    this.timeCodes = this.timeCodeService
      .getTimeCodes()
      .filter(
        (timeCode) => timeCode.name !== this.focusedBooking.timeCode.name,
      );
    this.projects = this.projectService
      .getProjects()
      .filter((project) => project.name !== this.focusedBooking.project.name);
    this.date = this.bookingService.deFormatDate(this.focusedBooking.date);
    this.hours = this.focusedBooking.hours;
    this.project = this.focusedBooking.project.name;
    this.timeCode = this.focusedBooking.timeCode.name;
    this.startTime = this.bookingService.calcTimeString(
      this.focusedBooking.startTime,
    );
  }

  updateBooking() {
    const updatedBooking: Booking = {
      project:
        this.projects.find((project) => project.name === this.project) ||
        this.focusedBooking.project,
      date: this.bookingService.formatDate(this.date),
      hours: this.hours,
      timeCode:
        this.timeCodes.find((timeCode) => timeCode.name === this.timeCode) ||
        this.focusedBooking.timeCode,
      startTime: this.bookingService.calcTime(this.startTime),
    };

    updatedBooking.lastModified = new Date().toLocaleString();
    const focusedUser: Superior | Member = this.loginService.getById(
      this.loginService.getLoggedInUserId(),
    );
    focusedUser.bookings[this.bookingService.getIndexOfFocusedBooking()] =
      updatedBooking;
    if (
      this.bookingService.checkForOverlappingBookings(
        focusedUser.bookings,
        this.bookingService.formatDate(this.date),
      ) &&
      this.bookingService.checkLunch(
        focusedUser.bookings,
        this.bookingService.formatDate(this.date),
      )
    ) {
      this.loginService.replaceSuperiorMember(focusedUser);
    } else {
      focusedUser.bookings[this.bookingService.getIndexOfFocusedBooking()] =
        this.focusedBooking;
    }
  }
}
