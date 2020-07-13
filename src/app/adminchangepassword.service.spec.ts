import { TestBed } from '@angular/core/testing';

import { AdminchangepasswordService } from './adminchangepassword.service';

describe('AdminchangepasswordService', () => {
  let service: AdminchangepasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminchangepasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
