import { Component } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { Member } from '../../models/Member';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { ProjectService } from '../../service/project.service';
import { Superior } from '../../models/Superior';
import { Project } from '../../models/Project';
import { BookingService } from '../../service/booking.service';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { TimeCodeService } from '../../service/time-code.service';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, RouterLink, NgIf, NgForOf, MatButton, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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
    let user = this.loginService.getById(this.loginService.getLoggedInUserId());
    if (!user) {
      router.navigate(['/login']);
    }
    this.activeUser = user as Member | Superior;
    this.projects = this.projectService.getProjects();
  }

  getDatesOfWeek(): string[] {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + this.weekOffset * 7);
    const currentDay = currentDate.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    currentDate.setDate(currentDate.getDate() + mondayOffset);

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() + i);
      return this.formatDate(day);
    });

    return weekDates;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
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
    const booking: Booking = this.createBooking();
    this.shift = setInterval(() => {
      if (this.isSameDay(booking.date, new Date())) {
        this.updateBooking(booking);
      } else {
        this.resetBooking(booking);
      }
    }, 36000);
  }

  createBooking(): Booking {
    return {
      project:
        this.projectService
          .getProjects()
          .find((project) => project.name === this.project) ||
        this.projectService.getProjects()[0],
      date: this.getDatesOfWeek()[new Date().getDay() - 1 || 6],
      hours: 0,
      timeCode: this.timeCodeService.getTimeCodes()[0],
      startTime: new Date().getHours() + new Date().getMinutes() / 60,
      endTime: new Date().getHours() + new Date().getMinutes() / 60,
    };
  }

  isSameDay(date1: string, date2: Date): boolean {
    return (
      date1.substring(0, 2).replace('.', '') ===
      date2.getDate().toString().substring(0, 2)
    );
  }

  updateBooking(booking: Booking) {
    booking.hours = Math.round((booking.hours + 0.01) * 100) / 100;
    this.activeUser.bookings[this.activeUser.bookings.length - 1] = booking;
    this.loginService.replaceSuperiorMember(this.activeUser);
  }

  resetBooking(booking: Booking) {
    booking.date = this.getDatesOfWeek()[new Date().getDay() - 1 || 6];
    booking.hours = 0;
    this.activeUser.bookings.push(booking);
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

  setFocusedUserAndDate(user: Member, date: string) {
    this.bookingService.setFocusedDate(date);
    this.loginService.setFocusedUserId(user.id);
  }
}
