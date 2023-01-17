import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VorgangstypListComponent } from './vorgangstyp-list.component';

describe('VorgangstypListComponent', () => {
  let component: VorgangstypListComponent;
  let fixture: ComponentFixture<VorgangstypListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VorgangstypListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorgangstypListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
