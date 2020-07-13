import { TestBed } from '@angular/core/testing';

import { DeleteadminService } from './deleteadmin.service';

describe('DeleteadminService', () => {
  let service: DeleteadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
