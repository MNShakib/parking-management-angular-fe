import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotDetailsModalComponent } from './slot-details-modal.component';

describe('SlotDetailsModalComponent', () => {
  let component: SlotDetailsModalComponent;
  let fixture: ComponentFixture<SlotDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
