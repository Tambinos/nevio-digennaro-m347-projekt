import { Component } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { Member } from '../../entity/Member';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { ProjectService } from '../../service/project.service';
import { Superior } from '../../entity/Superior';
import { Project } from '../../entity/Project';
import { BookingService } from '../../service/booking.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../entity/Booking';
import { TimeCodeService } from '../../service/time-code.service';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // @ts-ignore
  activeUser: Member | Superior;
  projects: Project[] = [];
  weekOffset = 0;
  project: string = 'Projekt auswählen';
  shiftState: boolean = true;
  shift: any;

  constructor(
    protected loginService: RoleService,
    private router: Router,
    private projectService: ProjectService,
    protected bookingService: BookingService,
    private timeCodeService: TimeCodeService,
    private route: ActivatedRoute,
  ) {
    if (
      this.loginService.getById(this.loginService.getLoggedInUserId()) ??
      false
    ) {
      this.activeUser = this.loginService.getById(
        this.loginService.getLoggedInUserId(),
      );
    } else {
      router.navigate(['/login']);
    }
    this.projects = this.projectService.getProjects();
    // this.route.queryParams.subscribe(params => {
    //   if (params['triggerFunction'] === 'true') {
    //     this.startShift();
    //     window.close();
    //   }
    // });
  }

  // generateQRData() {
  //   const baseUrl = window.location.href; // Or your app's base URL
  //   const params = new URLSearchParams({ triggerFunction: 'true' }).toString();
  //   return `${baseUrl}?${params}`;
  // }

  getDatesOfWeek(): string[] {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + this.weekOffset * 7);
    const currentDay = currentDate.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(currentDate);
    monday.setDate(monday.getDate() + mondayOffset);
    const formatDate = (date: Date) => {
      let day = date.getDate().toString().padStart(2, '0');
      if (Number.parseInt(day) / 10 < 1) {
        day = day.substring(1);
      }
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      if (Number.parseInt(month) / 10 < 1) {
        month = month.substring(1);
      }
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      weekDates.push(formatDate(day) + '');
    }
    return weekDates;
  }

  logout() {
    this.loginService.setLoggedInUserId(-1);
    this.router.navigate(['/login']);
  }

  switchShift() {
    if (this.shiftState) {
      this.startShift();
    } else {
      clearInterval(this.shift);
    }
    this.shiftState = !this.shiftState;
  }

  startShift() {
    let shiftBookingIndex = this.activeUser.bookings.length;
    let booking = new Booking(
      this.projectService
        .getProjects()
        .filter((project) => project.name === this.project)[0] ??
        this.projectService.getProjects()[0],
      this.getDatesOfWeek()[new Date().getDay() - 1 || 6],
      0,
      this.timeCodeService.getTimeCodes()[0],
      new Date().getHours() + new Date().getMinutes() / 60,
    );
    this.shift = setInterval(() => {
      if (
        booking.date.substring(0, 2).replace('.', '') ===
        new Date().getDate().toString().substring(0, 2)
      ) {
        booking.hours += 0.01;
        booking.hours = Math.round(booking.hours * 100) / 100;
        this.activeUser.bookings[shiftBookingIndex] = booking;
        this.loginService.replaceSuperiorMember(
          this.activeUser.id,
          this.activeUser,
        );
      } else {
        booking.date = this.getDatesOfWeek()[new Date().getDay() - 1 || 6];
        booking.hours = 0;
        this.activeUser.bookings.push(booking);
        shiftBookingIndex = this.activeUser.bookings.length;
      }
    }, 36000);
  }

  lastWeek() {
    this.weekOffset--;
  }

  nextWeek() {
    this.weekOffset++;
  }

  getBookingsTimeByDate(date: string, user: Member): number {
    return (
      Math.round(
        user.bookings
          .filter((booking) => booking.date === date)
          .reduce((a, b) => a + b.hours, 0) * 1000,
      ) / 1000
    );
  }

  protected readonly console = console;
}
