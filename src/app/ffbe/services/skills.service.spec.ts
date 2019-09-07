import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {DataMiningClientService} from './data-mining-client.service';
import {SkillsService} from './skills.service';
import {Skill} from '../model/skill.model';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA,
  MAGIC_SKILLS_NAMES_TEST_DATA,
  MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  MAGIC_SKILLS_TEST_DATA,
  PASSIVE_SKILLS_TEST_DATA
} from '../model/skill.model.spec';

class DataMiningMock {
  public getSkillsMagic$(): Observable<Object> {
    return of(JSON.parse(MAGIC_SKILLS_TEST_DATA));
  }

  public getSkillsAbility$(): Observable<Object> {
    return of(JSON.parse(ABILITY_SKILLS_TEST_DATA));
  }

  public getSkillsPassive$(): Observable<Object> {
    return of(JSON.parse(PASSIVE_SKILLS_TEST_DATA));
  }

  public getSkillsNames$(): Observable<Object> {
    return of(JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA));
  }

  public getSkillsMagicNames$(): Observable<Object> {
    return of(JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA));
  }

  public getSkillsDescriptions$(): Observable<Object> {
    return of(JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA));
  }

  public getSkillsMagicDescriptions$(): Observable<Object> {
    return of(JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA));
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
    spyOn(dataMiningService, 'getSkillsMagic$').and.callThrough();
    spyOn(dataMiningService, 'getSkillsAbility$').and.callThrough();
    spyOn(dataMiningService, 'getSkillsPassive$').and.callThrough();
    spyOn(dataMiningService, 'getSkillsNames$').and.callThrough();
    spyOn(dataMiningService, 'getSkillsMagicNames$').and.callThrough();
    spyOn(dataMiningService, 'getSkillsDescriptions$').and.callThrough();
    spyOn(dataMiningService, 'getSkillsMagicDescriptions$').and.callThrough();
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
    expect(dataMiningService.getSkillsMagic$).toHaveBeenCalledTimes(1);
    expect(dataMiningService.getSkillsAbility$).toHaveBeenCalledTimes(1);
    expect(dataMiningService.getSkillsPassive$).toHaveBeenCalledTimes(1);
    expect(dataMiningService.getSkillsNames$).toHaveBeenCalledTimes(1);
    expect(dataMiningService.getSkillsMagicNames$).toHaveBeenCalledTimes(1);
    expect(dataMiningService.getSkillsDescriptions$).toHaveBeenCalledTimes(1);
    expect(dataMiningService.getSkillsMagicDescriptions$).toHaveBeenCalledTimes(1);
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
