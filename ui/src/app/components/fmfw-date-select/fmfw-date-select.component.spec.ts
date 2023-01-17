import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwDateSelectComponent } from './fmfw-date-select.component';

describe('FmfwDateSelectComponent', () => {
  let component: FmfwDateSelectComponent;
  let fixture: ComponentFixture<FmfwDateSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwDateSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
