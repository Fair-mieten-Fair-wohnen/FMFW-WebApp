import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCauserComponent } from './summary-causer.component';

describe('SummaryCauserComponent', () => {
  let component: SummaryCauserComponent;
  let fixture: ComponentFixture<SummaryCauserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryCauserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryCauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
