import { TestBed } from '@angular/core/testing';

import { GetadmindetailsService } from './getadmindetails.service';

describe('GetadmindetailsService', () => {
  let service: GetadmindetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetadmindetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
