import { TestBed } from '@angular/core/testing';

import { ReturnrejectService } from './returnreject.service';

describe('ReturnrejectService', () => {
  let service: ReturnrejectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnrejectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
