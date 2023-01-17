import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAggregatedChartsComponent } from './list-of-aggregated-charts.component';

describe('ListOfAggregatedChartsComponent', () => {
  let component: ListOfAggregatedChartsComponent;
  let fixture: ComponentFixture<ListOfAggregatedChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfAggregatedChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAggregatedChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
