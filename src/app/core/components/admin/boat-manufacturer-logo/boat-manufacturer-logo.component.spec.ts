import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatManufacturerLogoComponent } from './boat-manufacturer-logo.component';

describe('BoatManufacturerLogoComponent', () => {
  let component: BoatManufacturerLogoComponent;
  let fixture: ComponentFixture<BoatManufacturerLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatManufacturerLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatManufacturerLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
