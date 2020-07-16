import { TestBed } from '@angular/core/testing';

import { ClaimitemService } from './claimitem.service';

describe('ClaimitemService', () => {
  let service: ClaimitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
