import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryFalltypologieComponent } from './summary-falltypologie.component';

describe('SummaryFalltypologieComponent', () => {
  let component: SummaryFalltypologieComponent;
  let fixture: ComponentFixture<SummaryFalltypologieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryFalltypologieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryFalltypologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
