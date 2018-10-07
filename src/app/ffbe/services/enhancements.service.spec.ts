import { TestBed, inject } from '@angular/core/testing';

import { EnhancementsService } from './enhancements.service';

describe('EnhancementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnhancementsService]
    });
  });

  it('should be created', inject([EnhancementsService], (service: EnhancementsService) => {
    expect(service).toBeTruthy();
  }));
});
