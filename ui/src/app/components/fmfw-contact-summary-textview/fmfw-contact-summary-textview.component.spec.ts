import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwContactSummaryTextviewComponent } from './fmfw-contact-summary-textview.component';

describe('FmfwContactSummaryTextviewComponent', () => {
  let component: FmfwContactSummaryTextviewComponent;
  let fixture: ComponentFixture<FmfwContactSummaryTextviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwContactSummaryTextviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwContactSummaryTextviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
