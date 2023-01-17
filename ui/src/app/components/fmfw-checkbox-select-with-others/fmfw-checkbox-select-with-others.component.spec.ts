import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwCheckboxSelectWithOthersComponent } from './fmfw-checkbox-select-with-others.component';

describe('FmfwCheckboxSelectWithOthersComponent', () => {
  let component: FmfwCheckboxSelectWithOthersComponent;
  let fixture: ComponentFixture<FmfwCheckboxSelectWithOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwCheckboxSelectWithOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwCheckboxSelectWithOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
