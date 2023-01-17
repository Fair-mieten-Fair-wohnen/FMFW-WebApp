import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerursachendenComponent } from './verursachenden.component';

describe('VerursachendenComponent', () => {
  let component: VerursachendenComponent;
  let fixture: ComponentFixture<VerursachendenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerursachendenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerursachendenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
