import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnterstuetzungComponent } from './unterstuetzung.component';

describe('UnterstuetzungComponent', () => {
  let component: UnterstuetzungComponent;
  let fixture: ComponentFixture<UnterstuetzungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnterstuetzungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnterstuetzungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
