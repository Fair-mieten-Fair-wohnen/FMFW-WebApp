import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Verlauf2Component } from './verlauf2.component';

describe('Verlauf2Component', () => {
  let component: Verlauf2Component;
  let fixture: ComponentFixture<Verlauf2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verlauf2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Verlauf2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
