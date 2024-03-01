import { TestBed } from '@angular/core/testing';

import { TimeCodeService } from './time-code.service';

describe('TimeCodeService', () => {
  let service: TimeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
