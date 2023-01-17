import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailAreaComponent } from './item-detail-area.component';

describe('ItemDetailAreaComponent', () => {
  let component: ItemDetailAreaComponent;
  let fixture: ComponentFixture<ItemDetailAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
