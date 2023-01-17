import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevNextButtonGroupComponent } from './prev-next-button-group.component';

describe('PrevNextButtonGroupComponent', () => {
  let component: PrevNextButtonGroupComponent;
  let fixture: ComponentFixture<PrevNextButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevNextButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevNextButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
