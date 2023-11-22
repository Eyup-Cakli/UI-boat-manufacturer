import { TestBed } from '@angular/core/testing';

import { BoatManufacturerLogoService } from './boat-manufacturer-logo.service';

describe('BoatManufacturerLogoService', () => {
  let service: BoatManufacturerLogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatManufacturerLogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
