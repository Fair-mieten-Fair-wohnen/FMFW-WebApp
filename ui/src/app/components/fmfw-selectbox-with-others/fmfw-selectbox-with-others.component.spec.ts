import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwSelectboxWithOthersComponent } from './fmfw-selectbox-with-others.component';

describe('FmfwSelectboxWithOthersComponent', () => {
  let component: FmfwSelectboxWithOthersComponent;
  let fixture: ComponentFixture<FmfwSelectboxWithOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwSelectboxWithOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwSelectboxWithOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
