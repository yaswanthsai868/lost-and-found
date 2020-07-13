import { TestBed } from '@angular/core/testing';

import { ChangeadmindetailsService } from './changeadmindetails.service';

describe('ChangeadmindetailsService', () => {
  let service: ChangeadmindetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeadmindetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
