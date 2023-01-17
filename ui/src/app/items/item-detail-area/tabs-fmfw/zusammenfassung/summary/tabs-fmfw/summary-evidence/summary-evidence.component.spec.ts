import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryEvidenceComponent } from './summary-evidence.component';

describe('SummaryEvidenceComponent', () => {
  let component: SummaryEvidenceComponent;
  let fixture: ComponentFixture<SummaryEvidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryEvidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
