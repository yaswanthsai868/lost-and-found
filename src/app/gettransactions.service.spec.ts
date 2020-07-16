import { TestBed } from '@angular/core/testing';

import { GettransactionsService } from './gettransactions.service';

describe('GettransactionsService', () => {
  let service: GettransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
