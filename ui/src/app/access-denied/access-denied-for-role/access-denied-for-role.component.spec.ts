import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedForRoleComponent } from './access-denied-for-role.component';

describe('AccessDeniedForRoleComponent', () => {
  let component: AccessDeniedForRoleComponent;
  let fixture: ComponentFixture<AccessDeniedForRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessDeniedForRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniedForRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
