import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Verlauf1Component } from './verlauf1.component';

describe('Verlauf1Component', () => {
  let component: Verlauf1Component;
  let fixture: ComponentFixture<Verlauf1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verlauf1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Verlauf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
