import { TestBed } from '@angular/core/testing';

import { BicycleSearchGuard } from './bicycle-search.guard';

describe('BicycleSearchGuardGuard', () => {
  let guard: BicycleSearchGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BicycleSearchGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
