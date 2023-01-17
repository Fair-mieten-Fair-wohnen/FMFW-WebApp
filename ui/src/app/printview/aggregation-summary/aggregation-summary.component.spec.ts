import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationSummaryComponent } from './aggregation-summary.component';

describe('AggregationSummaryComponent', () => {
  let component: AggregationSummaryComponent;
  let fixture: ComponentFixture<AggregationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
