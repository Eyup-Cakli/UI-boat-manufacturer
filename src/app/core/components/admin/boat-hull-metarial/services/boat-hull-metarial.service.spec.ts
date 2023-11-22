import { TestBed } from '@angular/core/testing';

import { BoatHullMetarialService } from './boat-hull-metarial.service';

describe('BoatHullMetarialService', () => {
  let service: BoatHullMetarialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatHullMetarialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
