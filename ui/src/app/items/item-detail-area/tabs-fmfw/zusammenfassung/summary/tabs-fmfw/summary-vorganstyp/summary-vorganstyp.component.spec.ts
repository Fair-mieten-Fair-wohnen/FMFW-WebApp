import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryVorganstypComponent } from './summary-vorganstyp.component';

describe('SummaryVorganstypComponent', () => {
  let component: SummaryVorganstypComponent;
  let fixture: ComponentFixture<SummaryVorganstypComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryVorganstypComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryVorganstypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
