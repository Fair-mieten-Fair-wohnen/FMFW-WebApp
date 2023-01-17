import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationAreaComponent } from './aggregation-area.component';

describe('AggregationAreaComponent', () => {
  let component: AggregationAreaComponent;
  let fixture: ComponentFixture<AggregationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
