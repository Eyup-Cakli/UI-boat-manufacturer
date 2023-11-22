import { TestBed } from '@angular/core/testing';

import { BoatManufacturerService } from './boat-manufacturer.service';

describe('BoatManufacturerService', () => {
  let service: BoatManufacturerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatManufacturerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
