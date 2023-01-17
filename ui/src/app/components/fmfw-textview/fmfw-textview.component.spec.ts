import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwTextviewComponent } from './fmfw-textview.component';

describe('FmfwTextviewComponent', () => {
  let component: FmfwTextviewComponent;
  let fixture: ComponentFixture<FmfwTextviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwTextviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwTextviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
