import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDoctorModalComponent } from './reservation-doctor-modal.component';

describe('ReservationDoctorModalComponent', () => {
  let component: ReservationDoctorModalComponent;
  let fixture: ComponentFixture<ReservationDoctorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationDoctorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDoctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
