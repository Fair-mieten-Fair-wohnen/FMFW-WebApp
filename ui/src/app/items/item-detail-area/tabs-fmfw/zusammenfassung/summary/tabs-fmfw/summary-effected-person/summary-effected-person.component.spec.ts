import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryEffectedPersonComponent } from './summary-effected-person.component';

describe('SummaryEffectedPersonComponent', () => {
  let component: SummaryEffectedPersonComponent;
  let fixture: ComponentFixture<SummaryEffectedPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryEffectedPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryEffectedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
