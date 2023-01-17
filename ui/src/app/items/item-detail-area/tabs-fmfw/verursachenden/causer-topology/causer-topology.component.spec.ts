import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauserTopologyComponent } from './causer-topology.component';

describe('CauserTopologyComponent', () => {
  let component: CauserTopologyComponent;
  let fixture: ComponentFixture<CauserTopologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauserTopologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauserTopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
