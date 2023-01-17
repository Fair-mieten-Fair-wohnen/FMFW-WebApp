import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwContactInputComponent } from './fmfw-contact-input.component';

describe('FmfwContactInputComponent', () => {
  let component: FmfwContactInputComponent;
  let fixture: ComponentFixture<FmfwContactInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwContactInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwContactInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
