import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelsiusToFahrenheitComponent } from './celsius-to-fahrenheit.component';

describe('CelsiusToFahrenheitComponent', () => {
  let component: CelsiusToFahrenheitComponent;
  let fixture: ComponentFixture<CelsiusToFahrenheitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelsiusToFahrenheitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelsiusToFahrenheitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
