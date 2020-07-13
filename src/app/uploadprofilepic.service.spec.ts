import { TestBed } from '@angular/core/testing';

import { UploadprofilepicService } from './uploadprofilepic.service';

describe('UploadprofilepicService', () => {
  let service: UploadprofilepicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadprofilepicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
