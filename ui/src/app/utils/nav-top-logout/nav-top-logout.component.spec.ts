import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTopLogoutComponent } from './nav-top-logout.component';

describe('NavTopLogoutComponent', () => {
  let component: NavTopLogoutComponent;
  let fixture: ComponentFixture<NavTopLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavTopLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTopLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
