import { TestBed } from '@angular/core/testing';

import { ChangeuserdetailsService } from './changeuserdetails.service';

describe('ChangeuserdetailsService', () => {
  let service: ChangeuserdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeuserdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
