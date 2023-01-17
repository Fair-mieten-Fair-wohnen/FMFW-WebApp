import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwSelectboxContentTextviewComponent } from './fmfw-selectbox-content-textview.component';

describe('FmfwSelectboxContentTextviewComponent', () => {
  let component: FmfwSelectboxContentTextviewComponent;
  let fixture: ComponentFixture<FmfwSelectboxContentTextviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwSelectboxContentTextviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwSelectboxContentTextviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
