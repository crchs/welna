import { TestBed } from '@angular/core/testing';

import { RavelryService } from './ravelry.service';

describe('RavelryService', () => {
  let service: RavelryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RavelryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
