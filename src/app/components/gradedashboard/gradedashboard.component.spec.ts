import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradedashboardComponent } from './gradedashboard.component';

describe('GradedashboardComponent', () => {
  let component: GradedashboardComponent;
  let fixture: ComponentFixture<GradedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradedashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
