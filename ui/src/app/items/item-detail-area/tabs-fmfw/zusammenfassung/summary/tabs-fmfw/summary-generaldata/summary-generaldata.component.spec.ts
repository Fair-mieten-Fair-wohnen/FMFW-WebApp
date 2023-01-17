import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGeneraldataComponent } from './summary-generaldata.component';

describe('SummaryGeneraldataComponent', () => {
  let component: SummaryGeneraldataComponent;
  let fixture: ComponentFixture<SummaryGeneraldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryGeneraldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryGeneraldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
