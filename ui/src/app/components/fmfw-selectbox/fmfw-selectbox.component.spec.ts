import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwSelectboxComponent } from './fmfw-selectbox.component';

describe('FmfwSelectboxComponent', () => {
  let component: FmfwSelectboxComponent;
  let fixture: ComponentFixture<FmfwSelectboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwSelectboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwSelectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
