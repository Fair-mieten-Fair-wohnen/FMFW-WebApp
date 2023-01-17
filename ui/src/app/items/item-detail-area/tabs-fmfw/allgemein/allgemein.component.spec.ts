import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgemeinComponent } from './allgemein.component';

describe('AllgemeinComponent', () => {
  let component: AllgemeinComponent;
  let fixture: ComponentFixture<AllgemeinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllgemeinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllgemeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
