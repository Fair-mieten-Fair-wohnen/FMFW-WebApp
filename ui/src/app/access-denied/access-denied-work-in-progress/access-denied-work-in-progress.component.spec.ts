import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedWorkInProgressComponent } from './access-denied-work-in-progress.component';

describe('AccessDeniedWorkInProgressComponent', () => {
  let component: AccessDeniedWorkInProgressComponent;
  let fixture: ComponentFixture<AccessDeniedWorkInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessDeniedWorkInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniedWorkInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
