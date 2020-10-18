import {Observable, of} from 'rxjs';
import {ENHANCEMENTS_TEST_DATA} from '../model/enhancement.model.testdata.spec';
import {inject, TestBed} from '@angular/core/testing';
import {DataMiningClientService} from './data-mining-client.service';
import {EnhancementsService} from './enhancements.service';
import {ABILITY_SKILLS_TEST_DATA} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {SkillsService} from './skills.service';
import {SkillsServiceMock} from './skills.service.spec';

class DataMiningMock {
  public getEnhancements$(): Observable<Object> {
    return of(JSON.parse(ENHANCEMENTS_TEST_DATA));
  }
}

describe('EnhancementsService', () => {
  let dataMiningService = null;
  let skillsService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EnhancementsService,
        {provide: DataMiningClientService, useClass: DataMiningMock},
        {provide: SkillsService, useClass: SkillsServiceMock},
      ]
    });
  });

  beforeEach(inject([DataMiningClientService, SkillsService],
    (dmService: DataMiningClientService, sService: SkillsService) => {
      dataMiningService = dmService;
      skillsService = sService;

      spyOn(dataMiningService, 'getEnhancements$').and.callThrough();
    }));

  it('should be created', inject([EnhancementsService], (service: EnhancementsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load enhancements from data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // WHEN
    service.loadEnhancementsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();
    // WHEN
    service.loadEnhancementsFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(dataMiningService.getEnhancements$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct enhancements by English name when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancementsContainer = service.searchForEnhancementsByNames('Kingdom\'s Hero', null);
    const baseEnhancements = enhancementsContainer.baseEnhancements;

    // THEN
    expect(baseEnhancements).toBeTruthy();
    expect(baseEnhancements.length).toEqual(2);
    expect(baseEnhancements[0].gumi_id).toEqual(228085001);
    expect(baseEnhancements[0].skill_id_old).toEqual(228085);
    expect(baseEnhancements[0].skill_id_new).toEqual(707785);
    expect(baseEnhancements[0].skill_id_base).toEqual(228085);
    expect(baseEnhancements[1].gumi_id).toEqual(228085002);
    expect(baseEnhancements[1].skill_id_old).toEqual(707785);
    expect(baseEnhancements[1].skill_id_new).toEqual(707786);
    expect(baseEnhancements[1].skill_id_base).toEqual(228085);
    expect(enhancementsContainer.activatedEnhancements).toBeNull();
  }));

  it('should find the correct enhancements by French name when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancementsContainer = service.searchForEnhancementsByNames(null, 'YoRHa N° 2 Type B');
    const baseEnhancements = enhancementsContainer.baseEnhancements;

    // THEN
    expect(baseEnhancements).toBeTruthy();
    expect(baseEnhancements.length).toEqual(2);
    expect(baseEnhancements[0].gumi_id).toEqual(230020001);
    expect(baseEnhancements[0].skill_id_old).toEqual(230020);
    expect(baseEnhancements[0].skill_id_new).toEqual(914071);
    expect(baseEnhancements[0].skill_id_base).toEqual(230020);
    expect(baseEnhancements[1].gumi_id).toEqual(230020002);
    expect(baseEnhancements[1].skill_id_old).toEqual(914071);
    expect(baseEnhancements[1].skill_id_new).toEqual(914072);
    expect(baseEnhancements[1].skill_id_base).toEqual(230020);
    expect(enhancementsContainer.activatedEnhancements).toBeNull();
  }));

  it('should find the correct enhancements by GumiID of base skill when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancementsContainer = service.searchForEnhancementsBySkillGumiId(228085);
    const baseEnhancements = enhancementsContainer.baseEnhancements;

    // THEN
    expect(baseEnhancements).toBeTruthy();
    expect(baseEnhancements.length).toEqual(2);
    expect(baseEnhancements[0].gumi_id).toEqual(228085001);
    expect(baseEnhancements[0].skill_id_old).toEqual(228085);
    expect(baseEnhancements[0].skill_id_new).toEqual(707785);
    expect(baseEnhancements[0].skill_id_base).toEqual(228085);
    expect(baseEnhancements[1].gumi_id).toEqual(228085002);
    expect(baseEnhancements[1].skill_id_old).toEqual(707785);
    expect(baseEnhancements[1].skill_id_new).toEqual(707786);
    expect(baseEnhancements[1].skill_id_base).toEqual(228085);
    expect(enhancementsContainer.activatedEnhancements).toBeNull();
  }));

  it('should find the correct enhancements by Character GumiID when searched if present in data mining', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    // WHEN
    const enhancementsContainer = service.searchForEnhancementsByCharacterGumiId(310000105);
    const baseEnhancements = enhancementsContainer.baseEnhancements;

    // THEN
    expect(baseEnhancements).toBeTruthy();
    expect(baseEnhancements.length).toEqual(2);
    expect(baseEnhancements[0].gumi_id).toEqual(230020001);
    expect(baseEnhancements[0].skill_id_old).toEqual(230020);
    expect(baseEnhancements[0].skill_id_new).toEqual(914071);
    expect(baseEnhancements[0].skill_id_base).toEqual(230020);
    expect(baseEnhancements[1].gumi_id).toEqual(230020002);
    expect(baseEnhancements[1].skill_id_old).toEqual(914071);
    expect(baseEnhancements[1].skill_id_new).toEqual(914072);
    expect(baseEnhancements[1].skill_id_base).toEqual(230020);
    expect(enhancementsContainer.activatedEnhancements).toBeNull();
  }));

  fit('should compute the correct enhancements for skills activated by random skills', inject([EnhancementsService], (service: EnhancementsService) => {
    // GIVEN
    service.loadEnhancementsFromDataMining();

    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);

    const skill1: Skill = skills['236574'];
    skill1.gumi_id = 236574;
    skill1.active = true;
    const skill2: Skill = skills['236575'];
    skill2.gumi_id = 236575;
    skill2.active = true;

    const skill3: Skill = skills['512781'];
    skill3.gumi_id = 512781;
    skill3.active = true;
    const skill4: Skill = skills['512782'];
    skill4.gumi_id = 512782;
    skill4.active = true;
    const skill5: Skill = skills['512783'];
    skill5.gumi_id = 512783;
    skill5.active = true;
    const skill6: Skill = skills['512784'];
    skill6.gumi_id = 512784;
    skill6.active = true;

    SkillsService['INSTANCE'] = skillsService;
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and.returnValues(
      Skill.produce(skill1), Skill.produce(skill3),
      Skill.produce(skill4),
    );

    //    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and.returnValues(
    //       Skill.produce(skill1),  Skill.produce(skill3),
    //       Skill.produce(skill4),
    //       Skill.produce(skill2),
    //       Skill.produce(skill5), Skill.produce(skill6));

    // WHEN
    const enhancementsContainer = service.searchForEnhancementsBySkillGumiId(236574);
    const baseEnhancements = enhancementsContainer.baseEnhancements;
    const activatedEnhancements = enhancementsContainer.activatedEnhancements;

    // THEN
    expect(baseEnhancements).toBeTruthy();
    expect(baseEnhancements.length).toEqual(1);
    expect(baseEnhancements[0].gumi_id).toEqual(300000139);
    expect(baseEnhancements[0].skill_id_old).toEqual(236574);
    expect(baseEnhancements[0].skill_id_new).toEqual(236575);
    expect(baseEnhancements[0].skill_id_base).toEqual(236574);

    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(236574);
    //expect(mySpy).toHaveBeenCalledWith(236575);
    expect(mySpy).toHaveBeenCalledWith(512781);
    expect(mySpy).toHaveBeenCalledWith(512782);
    //expect(mySpy).toHaveBeenCalledWith(512783);
    //expect(mySpy).toHaveBeenCalledWith(512784);
    /*
        expect(activatedEnhancements).toBeTruthy();
        expect(activatedEnhancements.length).toEqual(2);
        expect(activatedEnhancements[0].gumi_id).toBeNull();
        expect(activatedEnhancements[0].skill_id_old).toEqual(512781);
        expect(activatedEnhancements[0].skill_id_new).toEqual(512783);
        expect(activatedEnhancements[0].skill_id_base).toEqual(512781);
        expect(activatedEnhancements[1].gumi_id).toBeNull();
        expect(activatedEnhancements[1].skill_id_old).toEqual(512782);
        expect(activatedEnhancements[1].skill_id_new).toEqual(512784);
        expect(activatedEnhancements[1].skill_id_base).toEqual(512782);

    */
  }));

});
