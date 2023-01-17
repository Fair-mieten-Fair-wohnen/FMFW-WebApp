import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeweiseComponent } from './beweise.component';

describe('BeweiseComponent', () => {
  let component: BeweiseComponent;
  let fixture: ComponentFixture<BeweiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeweiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeweiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
