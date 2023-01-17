import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwCheckboxSelectComponent } from './fmfw-checkbox-select.component';

describe('FmfwCheckboxSelectComponent', () => {
  let component: FmfwCheckboxSelectComponent;
  let fixture: ComponentFixture<FmfwCheckboxSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwCheckboxSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwCheckboxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
