import { TestBed } from '@angular/core/testing';

import { BoatTypeService } from './boat-type.service';

describe('BoatTypeService', () => {
  let service: BoatTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
