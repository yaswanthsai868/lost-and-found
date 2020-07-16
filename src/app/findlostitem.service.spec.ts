import { TestBed } from '@angular/core/testing';

import { FindlostitemService } from './findlostitem.service';

describe('FindlostitemService', () => {
  let service: FindlostitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindlostitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
