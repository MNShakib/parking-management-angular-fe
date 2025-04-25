import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInputModalComponent } from './vehicle-input-modal.component';

describe('VehicleInputModalComponent', () => {
  let component: VehicleInputModalComponent;
  let fixture: ComponentFixture<VehicleInputModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleInputModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
