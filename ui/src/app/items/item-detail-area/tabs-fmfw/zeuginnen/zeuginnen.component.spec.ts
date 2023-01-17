import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeuginnenComponent } from './zeuginnen.component';

describe('ZeugenBeweiseComponent', () => {
  let component: ZeuginnenComponent;
  let fixture: ComponentFixture<ZeuginnenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZeuginnenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeuginnenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
