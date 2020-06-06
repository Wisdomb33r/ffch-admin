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
  PASSIVE_SKILLS_TEST_DATA
} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';

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

describe('CharactersService', () => {
  let dataMiningService = null;
  let skillsService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersService,
        {provide: DataMiningClientService, useClass: DataMiningMock},
        {provide: SkillsService, useClass: SkillsServiceMock},
        {provide: LimitBurstsService, useClass: LimitBurstServiceMock},
      ]
    });
  });

  beforeEach(inject([DataMiningClientService, SkillsService], (dmService: DataMiningClientService, sService: SkillsService) => {
    dataMiningService = dmService;
    skillsService = sService;
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

    service.loadCharactersFromDataMining();
    // WHEN
    const character: Character = service.searchForCharacterByName('Loren');
    // THEN
    expect(character).toBeTruthy();
    expect(character.entries.length === 3);
    expect(character.entries[100009107].upgraded_limitburst_id).toEqual(900000087);
  }));
});
