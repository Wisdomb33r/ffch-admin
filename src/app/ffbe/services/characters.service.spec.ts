import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {CharactersService} from './characters.service';
import {DataMiningClientService} from './data-mining-client.service';
import {CHARACTER_TEST_DATA} from '../model/character.model.spec';
import {SkillsService} from './skills.service';
import {Character} from '../model/character.model';
import {LimitBurstsService} from './limit-bursts.service';
import {SkillsServiceMock} from './skills.service.spec';
import {
  ABILITY_SKILLS_TEST_DATA, MAGIC_SKILLS_TEST_DATA,
  PASSIVE_SKILLS_TEST_DATA
} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {EnhancementsService} from './enhancements.service';
import {ENHANCEMENTS_TEST_DATA} from './enhancements.service.spec';

class DataMiningMock {
  public getCharacters$(): Observable<Object> {
    return of(JSON.parse(CHARACTER_TEST_DATA));
  }
}

class LimitBurstServiceMock {
  public searchForLimitBurstByGumiId(id) {
    return [];
  }
}

class EnhancementsServiceMock {
  public searchForEnhancementsBySkillGumiId(id) {
    return [];
  }
}

describe('CharactersService', () => {
  let dataMiningService = null;
  let skillsService = null;
  let enhancementsService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersService,
        {provide: DataMiningClientService, useClass: DataMiningMock},
        {provide: SkillsService, useClass: SkillsServiceMock},
        {provide: LimitBurstsService, useClass: LimitBurstServiceMock},
        {provide: EnhancementsService, useClass: EnhancementsServiceMock}
      ]
    });
  });

  beforeEach(inject([DataMiningClientService, SkillsService, EnhancementsService],
    (dmService: DataMiningClientService, sService: SkillsService, eService: EnhancementsService) => {
      dataMiningService = dmService;
      skillsService = sService;
      enhancementsService = eService;
      spyOn(dataMiningService, 'getCharacters$').and.callThrough();
    }));

  it('should be created', inject([CharactersService], (service: CharactersService) => {
    expect(service).toBeTruthy();
  }));

  it('should load characters from data mining', inject([CharactersService], (service: CharactersService) => {
    // WHEN
    service.loadCharactersFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
  }));

  it('should not load twice the data mining if loading requested twice', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    service.loadCharactersFromDataMining();
    // THEN
    expect(service.isLoaded()).toBeTruthy();
    expect(dataMiningService.getCharacters$).toHaveBeenCalledTimes(1);
  }));

  it('should find the correct character when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();

    // WHEN
    const character: Character = service.searchForCharacterByName('Hunter Rain');
    // THEN
    expect(character).toBeTruthy();
    expect(character.gumi_id).toEqual(100000115);
  }));

  it('should find null when searched if character not present', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    const personnage = service.searchForCharacterByName('Raining');
    // THEN
    expect(personnage).toBeFalsy();
  }));

  it('should find the correct enhanced-by-passive-skill limit burst ID  when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const skill1: Skill = skills['100020'];
    skill1.gumi_id = 100020;
    const skill2: Skill = skills['227160'];
    skill2.gumi_id = 227160;
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));

    const loadedCharacters = service['charactersFromDataMining'];
    loadedCharacters['100009105']['skills'] = [loadedCharacters['100009105']['skills'][4], loadedCharacters['100009105']['skills'][27]];

    service.loadCharactersFromDataMining();
    // WHEN
    const character: Character = service.searchForCharacterByName('Loren');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(213840);
    expect(mySpy).toHaveBeenCalledWith(227166);
    expect(character).toBeTruthy();
    expect(character.entries.length === 3);
    expect(character.entries['100009107'].upgraded_limitburst_id).toEqual(900000087);
  }));

  it('should find the correct enhanced-when-low-HP limit burst ID  when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const skill1: Skill = skills['234232'];
    skill1.gumi_id = 234232;
    const skill2: Skill = skills['100020'];
    skill2.gumi_id = 100020;
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));

    service.loadCharactersFromDataMining();

    const loadedCharacters = service['charactersFromDataMining'];
    loadedCharacters['250000105']['skills'] = [loadedCharacters['250000105']['skills'][3], loadedCharacters['250000105']['skills'][24]];
    // WHEN
    const character: Character = service.searchForCharacterByName('Serah');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(234212);
    expect(mySpy).toHaveBeenCalledWith(234232);
    expect(character).toBeTruthy();
    expect(character.entries.length === 3);
    expect(character.entries['250000107'].upgraded_limitburst_id).toEqual(900000353);
  }));

  it('should find the correct enhanced-by-enhanced-skill limit burst ID  when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const skill1: Skill = skills['100020'];
    skill1.gumi_id = 100020;
    const skill2: Skill = skills['100021'];
    skill2.gumi_id = 100021;
    const skill3: Skill = skills['707785'];
    skill3.gumi_id = 707785;
    const skill4: Skill = skills['707786'];
    skill4.gumi_id = 707786;
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2), Skill.produce(skill3), Skill.produce(skill4));

    const enhancements = JSON.parse(ENHANCEMENTS_TEST_DATA);

    const enhancement1 = enhancements['228085001'];
    enhancement1.gumi_id = 228085001;
    enhancement1.level = 1;
    const enhancement2 = enhancements['228085002'];
    enhancement2.gumi_id = 228085002;
    enhancement2.level = 2;
    const myEnhancementsSpy = spyOn(enhancementsService, 'searchForEnhancementsBySkillGumiId').and
      .returnValues([], [], [], [enhancement1, enhancement2]);

    const loadedCharacters = service['charactersFromDataMining'];
    loadedCharacters['100010005']['skills'] = [loadedCharacters['100010005']['skills'][4], loadedCharacters['100010005']['skills'][32]];

    service.loadCharactersFromDataMining();
    // WHEN
    const character: Character = service.searchForCharacterByName('Raegen');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(4);
    expect(mySpy).toHaveBeenCalledWith(101370);
    expect(mySpy).toHaveBeenCalledWith(228085);
    expect(mySpy).toHaveBeenCalledWith(707785);
    expect(mySpy).toHaveBeenCalledWith(707786);
    expect(myEnhancementsSpy).toHaveBeenCalledTimes(4);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(101370);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(228085);
    expect(character).toBeTruthy();
    expect(character.entries.length === 3);
    expect(character.entries['100010007'].upgraded_limitburst_id).toEqual(900000330);
  }));

  it('should filter out active skills when searching for enhanced limit burst ID if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    const skills = {
      ...JSON.parse(PASSIVE_SKILLS_TEST_DATA),
      ...(JSON.parse(ABILITY_SKILLS_TEST_DATA)),
      ...(JSON.parse(MAGIC_SKILLS_TEST_DATA))
    };


    const skill1: Skill = skills['100020'];
    skill1.gumi_id = 100020;
    const skill2: Skill = skills['232639'];
    skill2.gumi_id = 232639;
    skill2.active = true;
    skill2.type = 'ABILITY';
    const skill3: Skill = skills['227160'];
    skill3.gumi_id = 227160;
    const skill4: Skill = skills['20300'];
    skill4.gumi_id = 20300;
    skill4.active = true;
    skill4.type = 'MAGIC';
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and
      .returnValues(Skill.produce(skill1), Skill.produce(skill2), Skill.produce(skill3), Skill.produce(skill4));

    const loadedCharacters = service['charactersFromDataMining'];
    loadedCharacters['100009105']['skills'] = [loadedCharacters['100009105']['skills'][4],
      loadedCharacters['100009105']['skills'][12],
      loadedCharacters['100009105']['skills'][15],
      loadedCharacters['100009105']['skills'][27]];

    service.loadCharactersFromDataMining();
    // WHEN
    const character: Character = service.searchForCharacterByName('Loren');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(4);
    expect(mySpy).toHaveBeenCalledWith(213840);
    expect(mySpy).toHaveBeenCalledWith(209530);
    expect(mySpy).toHaveBeenCalledWith(213820);
    expect(mySpy).toHaveBeenCalledWith(227166);
    expect(character).toBeTruthy();
    expect(character.entries.length === 3);
    expect(character.entries['100009107'].upgraded_limitburst_id).toEqual(900000087);
  }));
});
