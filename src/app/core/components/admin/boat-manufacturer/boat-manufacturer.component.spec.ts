import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatManufacturerComponent } from './boat-manufacturer.component';

describe('BoatManufacturerComponent', () => {
  let component: BoatManufacturerComponent;
  let fixture: ComponentFixture<BoatManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatManufacturerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
