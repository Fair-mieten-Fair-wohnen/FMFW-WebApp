import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FMFWContactListViewComponent } from './fmfw-contact-list-view.component';

describe('FMFWContactListViewComponent', () => {
  let component: FMFWContactListViewComponent;
  let fixture: ComponentFixture<FMFWContactListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FMFWContactListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FMFWContactListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
