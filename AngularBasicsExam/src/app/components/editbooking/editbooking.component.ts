import {Component} from '@angular/core';
import {BookingService} from "../../service/booking.service";
import {TimeCodeService} from '../../service/time-code.service';
import {ProjectService} from "../../service/project.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Booking} from "../../entity/Booking";
import {Project} from "../../entity/Project";
import {TimeCode} from "../../entity/TimeCode";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-editbooking',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './editbooking.component.html',
  styleUrl: './editbooking.component.css'
})
export class EditbookingComponent {
  focusedBooking: Booking;
  timeCodes: TimeCode[];
  projects: Project[];
  date: string
  startTime: string;
  hours: number
  project: string
  timeCode: string

  constructor(
    protected bookingService: BookingService,
    protected timeCodeService: TimeCodeService,
    protected projectService: ProjectService,
    protected loginService: LoginService
  ) {
    this.focusedBooking = this.bookingService.getFocusedBooking();
    this.timeCodes = this.timeCodeService
      .getTimeCodes()
      .filter(timeCode => timeCode.name !== this.focusedBooking.timeCode.name);
    this.projects = this.projectService
      .getProjects()
      .filter(project => project.name !== this.focusedBooking.project.name);
    this.date = bookingService.deFormatDate(this.focusedBooking.date);
    this.hours = this.focusedBooking.hours;
    this.project = this.focusedBooking.project.name;
    this.timeCode = this.focusedBooking.timeCode.name;
    this.startTime = this.bookingService.calcTimeString(this.focusedBooking.startTime);
  }

  updateBooking() {
    console.log(this.startTime)
    this.focusedBooking = new Booking(
      this.projects
        .find(project => project.name === this.project)
      || this.focusedBooking.project,
      this.bookingService
        .formatDate(this.date),
      this.hours,
      this.timeCodes
        .find(timeCode => timeCode.name === this.timeCode)
      || this.focusedBooking.timeCode,
      this.bookingService.calcTime(this.startTime));
    this.focusedBooking.lastModified = new Date().toLocaleString();
    this.bookingService.setFocusedBooking(this.focusedBooking);
    let focusedUser = this.loginService.getById(this.loginService.getLoggedInUserId());
    let newBookings = focusedUser.bookings
    newBookings[this.bookingService.getIndexOfFocusedBooking()] = this.focusedBooking;
    if (
      this.bookingService.checkForOverlappingBookings(newBookings, this.bookingService.formatDate(this.date)) &&
      this.bookingService.checkLunch(newBookings, this.bookingService.formatDate(this.date)))
    {
      focusedUser.bookings = newBookings;
      this.loginService.replaceSuperiorMember(focusedUser.id, focusedUser);
    }
  }
}
