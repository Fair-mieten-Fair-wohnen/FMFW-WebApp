import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwDetailsSideNavComponent } from './fmfw-details-side-nav.component';

describe('FmfwDetailsSideNavComponent', () => {
  let component: FmfwDetailsSideNavComponent;
  let fixture: ComponentFixture<FmfwDetailsSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwDetailsSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwDetailsSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
