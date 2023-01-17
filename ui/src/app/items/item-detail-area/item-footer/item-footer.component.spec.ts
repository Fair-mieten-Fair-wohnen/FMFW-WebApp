import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFooterComponent } from './item-footer.component';

describe('ItemFooterComponent', () => {
  let component: ItemFooterComponent;
  let fixture: ComponentFixture<ItemFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
