import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwSummaryHeaderComponent } from './fmfw-summary-header.component';

describe('FmfwSummaryHeaderComponent', () => {
  let component: FmfwSummaryHeaderComponent;
  let fixture: ComponentFixture<FmfwSummaryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwSummaryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwSummaryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
