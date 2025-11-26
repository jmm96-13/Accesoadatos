import { TestBed } from '@angular/core/testing';

import { PetTrackerService } from './pet-tracker.service';

describe('PetTrackerService', () => {
  let service: PetTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
