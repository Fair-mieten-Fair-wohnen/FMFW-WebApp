import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationSingleChartComponent } from './aggregation-single-chart.component';

describe('AggregationSingleChartComponent', () => {
  let component: AggregationSingleChartComponent;
  let fixture: ComponentFixture<AggregationSingleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationSingleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationSingleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
