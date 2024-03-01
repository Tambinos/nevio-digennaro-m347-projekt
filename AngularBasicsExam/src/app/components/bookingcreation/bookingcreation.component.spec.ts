import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingcreationComponent } from './bookingcreation.component';

describe('BookingcreationComponent', () => {
  let component: BookingcreationComponent;
  let fixture: ComponentFixture<BookingcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingcreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
