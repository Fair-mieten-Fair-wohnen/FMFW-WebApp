import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwItemSearchComponent } from './fmfw-item-search.component';

describe('ItemSearchComponent', () => {
  let component: FmfwItemSearchComponent;
  let fixture: ComponentFixture<FmfwItemSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwItemSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
