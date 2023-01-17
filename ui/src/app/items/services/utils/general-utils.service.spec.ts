import { TestBed, inject } from '@angular/core/testing';

import { GeneralUtilsService } from './general-utils.service';

describe('GeneralUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralUtilsService]
    });
  });

  it('should be created', inject([GeneralUtilsService], (service: GeneralUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
