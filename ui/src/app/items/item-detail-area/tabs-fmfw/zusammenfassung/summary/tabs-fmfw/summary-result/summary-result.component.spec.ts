import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryResultComponent } from './summary-result.component';

describe('SummaryResultComponent', () => {
  let component: SummaryResultComponent;
  let fixture: ComponentFixture<SummaryResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
