import { Component } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { BookingService } from '../../service/booking.service';
import { Booking } from '../../entity/Booking';
import { Member } from '../../entity/Member';
import { Superior } from '../../entity/Superior';
import { Router, RouterLink } from '@angular/router';
import { NgForOf, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-viewbookings',
  standalone: true,
  imports: [NgForOf, NgStyle, RouterLink, NgIf],
  templateUrl: './viewbookings.component.html',
  styleUrl: './viewbookings.component.css',
})
export class ViewbookingsComponent {
  focusedDate: string;
  bookings: Booking[];
  focusedUser: Member | Superior;

  constructor(
    protected loginService: RoleService,
    protected bookingService: BookingService,
    protected router: Router,
  ) {
    if (
      this.loginService.getById(this.loginService.getLoggedInUserId()) ??
      false
    ) {
    } else {
      router.navigate(['/login']);
    }
    this.focusedUser = this.loginService.getById(
      this.loginService.getFocusedUserId(),
    );
    this.focusedDate = this.bookingService.getFocusedDate();
    this.bookings = this.focusedUser.bookings.filter(
      (booking) => booking.date === this.focusedDate,
    );
  }

  deleteBooking(bookingToDelete: Booking) {
    const response = confirm('Are you sure you want to delete this booking?');
    if (!response) {
      return;
    }
    this.focusedUser.bookings = this.focusedUser.bookings.filter(
      (booking) => booking !== bookingToDelete,
    );
    this.bookings = this.focusedUser.bookings.filter(
      (booking) => booking.date === this.focusedDate,
    );
    this.loginService.replaceSuperiorMember(
      this.focusedUser.id,
      this.focusedUser,
    );
  }
}
