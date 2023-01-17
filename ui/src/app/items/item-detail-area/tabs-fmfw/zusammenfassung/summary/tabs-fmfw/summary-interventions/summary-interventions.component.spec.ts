import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryInterventionsComponent } from './summary-interventions.component';

describe('SummaryInterventionsComponent', () => {
  let component: SummaryInterventionsComponent;
  let fixture: ComponentFixture<SummaryInterventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryInterventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
