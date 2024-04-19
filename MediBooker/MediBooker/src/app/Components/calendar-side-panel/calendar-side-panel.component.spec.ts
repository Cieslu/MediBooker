import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSidePanelComponent } from './calendar-side-panel.component';

describe('CalendarSidePanelComponent', () => {
  let component: CalendarSidePanelComponent;
  let fixture: ComponentFixture<CalendarSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarSidePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
