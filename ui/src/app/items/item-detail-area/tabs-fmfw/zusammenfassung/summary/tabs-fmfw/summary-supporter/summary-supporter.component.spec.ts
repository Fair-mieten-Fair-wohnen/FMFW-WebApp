import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySupporterComponent } from './summary-supporter.component';

describe('SummarySupporterComponent', () => {
  let component: SummarySupporterComponent;
  let fixture: ComponentFixture<SummarySupporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySupporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySupporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
