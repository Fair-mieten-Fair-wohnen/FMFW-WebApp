import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwAggregationChartComponent } from './fmfw-aggregation-chart.component';

describe('FmfwAggregationChartComponent', () => {
  let component: FmfwAggregationChartComponent;
  let fixture: ComponentFixture<FmfwAggregationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwAggregationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwAggregationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
