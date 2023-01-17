import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationPrintAllComponent } from './aggregation-print-all.component';

describe('AggregationPrintAllComponent', () => {
  let component: AggregationPrintAllComponent;
  let fixture: ComponentFixture<AggregationPrintAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationPrintAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationPrintAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
