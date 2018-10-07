import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {DataMiningClientService} from './data-mining-client.service';
import {SKILL_TEST_DATA} from '../model/skill.model.spec';
import {SkillsService} from './skills.service';
import {Skill} from '../model/skill.model';

class DataMiningMock {
  public getSkills$(): Observable<Object> {
    return of(JSON.parse(SKILL_TEST_DATA));
  }
}

describe('SkillsService', () => {
  let dataMiningService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkillsService,
        {provide: DataMiningClientService, useClass: DataMiningMock}
      ]
    });
  });

  beforeEach(inject([DataMiningClientService], (service: DataMiningClientService) => {
    dataMiningService = service;
    spyOn(dataMiningService, 'getSkills$').and.callThrough();
  }));

  it('should be created', inject([SkillsService], (service: SkillsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load skills from data mining', inject([SkillsService], (service: SkillsService) => {
    // WHEN
    service.loadSkillsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([SkillsService], (service: SkillsService) => {
    // GIVEN
    service.loadSkillsFromDataMining();
    // WHEN
    service.loadSkillsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(dataMiningService.getSkills$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct skill when searched if present in data mining', inject([SkillsService], (service: SkillsService) => {
    // GIVEN
    service.loadSkillsFromDataMining();
    // WHEN
    const skill: Skill = service.searchForSkillByGumiId(10020);
    // THEN
    expect(skill).toBeTruthy();
    expect(skill.name).toBe('Cure');
    expect(skill.gumi_id).toBe(10020);
  }));

  it('should find null when searched if skill not present', inject([SkillsService], (service: SkillsService) => {
    // GIVEN
    service.loadSkillsFromDataMining();
    // WHEN
    const skill: Skill = service.searchForSkillByGumiId(90020);
    // THEN
    expect(skill).toBeFalsy();
  }));
});
