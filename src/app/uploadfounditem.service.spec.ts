import { TestBed } from '@angular/core/testing';

import { UploadfounditemService } from './uploadfounditem.service';

describe('UploadfounditemService', () => {
  let service: UploadfounditemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadfounditemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
