import { TestBed } from '@angular/core/testing';

import { UserchangepasswordService } from './userchangepassword.service';

describe('UserchangepasswordService', () => {
  let service: UserchangepasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserchangepasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
