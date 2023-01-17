import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VorgangstypComponent } from './vorgangstyp.component';

describe('VorgangstypComponent', () => {
  let component: VorgangstypComponent;
  let fixture: ComponentFixture<VorgangstypComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VorgangstypComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorgangstypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
