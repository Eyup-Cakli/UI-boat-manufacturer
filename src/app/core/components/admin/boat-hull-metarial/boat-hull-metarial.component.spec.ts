import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatHullMetarialComponent } from './boat-hull-metarial.component';

describe('BoatHullMetarialComponent', () => {
  let component: BoatHullMetarialComponent;
  let fixture: ComponentFixture<BoatHullMetarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatHullMetarialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatHullMetarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
