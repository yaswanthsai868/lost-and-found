import { TestBed } from '@angular/core/testing';

import { GetuploadeditemsService } from './getuploadeditems.service';

describe('GetuploadeditemsService', () => {
  let service: GetuploadeditemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetuploadeditemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
