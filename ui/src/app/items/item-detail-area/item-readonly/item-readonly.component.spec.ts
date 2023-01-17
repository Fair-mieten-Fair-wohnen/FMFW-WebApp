import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReadonlyComponent } from './item-readonly.component';

describe('ItemReadonlyComponent', () => {
  let component: ItemReadonlyComponent;
  let fixture: ComponentFixture<ItemReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
