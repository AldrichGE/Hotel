import { TestBed } from '@angular/core/testing';

import { HospitalityService } from './hospitality.service';

describe('HospitalityService', () => {
  let service: HospitalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
