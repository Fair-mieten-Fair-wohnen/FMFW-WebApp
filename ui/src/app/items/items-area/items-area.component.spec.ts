import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsAreaComponent } from './items-area.component';

describe('ItemsAreaComponent', () => {
  let component: ItemsAreaComponent;
  let fixture: ComponentFixture<ItemsAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
