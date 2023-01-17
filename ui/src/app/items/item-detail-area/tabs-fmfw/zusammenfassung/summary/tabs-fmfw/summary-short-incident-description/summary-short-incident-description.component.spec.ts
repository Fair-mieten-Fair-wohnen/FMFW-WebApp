import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryShortIncidentDescriptionComponent } from './summary-short-incident-description.component';

describe('SummaryShortIncidentDescriptionComponent', () => {
  let component: SummaryShortIncidentDescriptionComponent;
  let fixture: ComponentFixture<SummaryShortIncidentDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryShortIncidentDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryShortIncidentDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
