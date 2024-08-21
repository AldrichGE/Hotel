import { TestBed } from '@angular/core/testing';

import { ConvenienceService } from './convenience.service';

describe('ConvenienceService', () => {
  let service: ConvenienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvenienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
