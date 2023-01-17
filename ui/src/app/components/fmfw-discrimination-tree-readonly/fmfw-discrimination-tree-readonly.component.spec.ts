import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmfwDiscriminationTreeReadonlyComponent } from './fmfw-discrimination-tree-readonly.component';

describe('FmfwDiscriminationTreeComponent', () => {
  let component: FmfwDiscriminationTreeReadonlyComponent;
  let fixture: ComponentFixture<FmfwDiscriminationTreeReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmfwDiscriminationTreeReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmfwDiscriminationTreeReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
