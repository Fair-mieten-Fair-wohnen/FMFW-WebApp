import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypologieComponent } from './typologie.component';

describe('TypologieComponent', () => {
  let component: TypologieComponent;
  let fixture: ComponentFixture<TypologieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypologieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
