import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatModelComponent } from './boat-model.component';

describe('BoatModelComponent', () => {
  let component: BoatModelComponent;
  let fixture: ComponentFixture<BoatModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
