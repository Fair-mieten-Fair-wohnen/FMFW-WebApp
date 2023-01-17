import { TestBed, inject } from '@angular/core/testing';

import { ValueListService } from './value-list.service';

describe('ValueListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueListService]
    });
  });

  it('should be created', inject([ValueListService], (service: ValueListService) => {
    expect(service).toBeTruthy();
  }));
});
