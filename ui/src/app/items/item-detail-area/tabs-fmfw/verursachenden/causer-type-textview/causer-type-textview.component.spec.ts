import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauserTypeTextviewComponent } from './causer-type-textview.component';

describe('CauserTypeTextviewComponent', () => {
  let component: CauserTypeTextviewComponent;
  let fixture: ComponentFixture<CauserTypeTextviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauserTypeTextviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauserTypeTextviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
