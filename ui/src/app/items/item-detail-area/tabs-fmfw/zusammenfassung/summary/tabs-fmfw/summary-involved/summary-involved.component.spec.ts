import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryInvolvedComponent } from './summary-involved.component';

describe('SummaryInvolvedComponent', () => {
  let component: SummaryInvolvedComponent;
  let fixture: ComponentFixture<SummaryInvolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryInvolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
