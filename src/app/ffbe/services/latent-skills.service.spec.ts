import {TestBed} from '@angular/core/testing';

import {LatentSkillsService} from './latent-skills.service';

describe('LatentSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LatentSkillsService = TestBed.get(LatentSkillsService);
    expect(service).toBeTruthy();
  });
});
