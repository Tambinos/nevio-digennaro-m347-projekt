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

@Component({
  selector: 'app-bookingcreation',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterLink],
  templateUrl: './bookingcreation.component.html',
  styleUrl: './bookingcreation.component.css',
})
export class BookingcreationComponent {
  projects: Project[];
  timeCodes: TimeCode[];
  // @ts-ignore
  focusedUser: Member | Superior;
  startTimeString: string = '0';
  hours = 0;
  date = '';
  project: string | undefined;
  timeCode: string | undefined;

  constructor(
    private projectservice: ProjectService,
    private loginService: RoleService,
    private timeCodeService: TimeCodeService,
    private router: Router,
    private bookingService: BookingService,
  ) {
    this.projects = this.projectservice.getProjects();
    this.timeCodes = this.timeCodeService.getTimeCodes();
    if (
      this.loginService.getById(this.loginService.getLoggedInUserId()) ??
      false
    ) {
      this.focusedUser = this.loginService.getById(
        this.loginService.getFocusedUserId(),
      );
    } else {
      router.navigate(['/login']);
    }
    this.date = this.bookingService.deFormatDate(
      this.bookingService.getFocusedDate(),
    );
  }

  createBooking() {
    console.log(this.focusedUser.bookings);
    const newBooking = new Booking(
      this.projects.find((project) => project.name === this.project) ??
        new Project('No Project'),
      this.bookingService.formatDate(this.date),
      this.hours,
      this.timeCodes.find((timeCode) => timeCode.name === this.timeCode) ??
        new TimeCode('No TimeCode', '#FFFFFF'),
      this.bookingService.calcTime(this.startTimeString),
    );
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
      this.loginService.replaceSuperiorMember(
        this.focusedUser.id,
        this.focusedUser,
      );
    }
  }
}
