import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBicycleComponent } from './new-bicycle.component';

describe('NewBicycleComponent', () => {
  let component: NewBicycleComponent;
  let fixture: ComponentFixture<NewBicycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBicycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBicycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
