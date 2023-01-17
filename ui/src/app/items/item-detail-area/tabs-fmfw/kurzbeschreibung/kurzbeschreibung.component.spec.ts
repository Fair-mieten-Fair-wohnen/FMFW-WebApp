import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurzbeschreibungComponent } from './kurzbeschreibung.component';

describe('KurzbeschreibungComponent', () => {
  let component: KurzbeschreibungComponent;
  let fixture: ComponentFixture<KurzbeschreibungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurzbeschreibungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurzbeschreibungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
