import { TestBed } from '@angular/core/testing';

import { GetuserdetailsService } from './getuserdetails.service';

describe('GetuserdetailsService', () => {
  let service: GetuserdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetuserdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
