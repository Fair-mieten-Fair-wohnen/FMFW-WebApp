import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryConclusionComponent } from './summary-conclusion.component';

describe('SummaryConclusionComponent', () => {
  let component: SummaryConclusionComponent;
  let fixture: ComponentFixture<SummaryConclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryConclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryConclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
