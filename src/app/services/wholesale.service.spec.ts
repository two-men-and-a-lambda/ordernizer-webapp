import { TestBed } from '@angular/core/testing';

import { WholeSaleService } from './wholesale.service';

describe('wholeSaleService', () => {
  let service: WholeSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WholeSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
