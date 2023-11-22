import { TestBed } from '@angular/core/testing';

import { BoatModelService } from './boat-model.service';

describe('BoatModelService', () => {
  let service: BoatModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
