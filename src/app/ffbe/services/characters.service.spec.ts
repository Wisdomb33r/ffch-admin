import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {CharactersService} from './characters.service';
import {DataMiningClientService} from './data-mining-client.service';
import {CHARACTER_TEST_DATA} from '../model/character/character.model.spec';
import {SkillsService} from './skills.service';
import {Character} from '../model/character/character.model';
import {LimitBurstsService} from './limit-bursts.service';
import {SkillsServiceMock} from './skills.service.spec';
import {ABILITY_SKILLS_TEST_DATA, MAGIC_SKILLS_TEST_DATA, PASSIVE_SKILLS_TEST_DATA} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {EnhancementsService} from './enhancements.service';
import {ENHANCEMENTS_TEST_DATA} from './enhancements.service.spec';
import {LatentSkillsService} from './latent-skills.service';
import {LATENT_SKILLS_TEST_DATA} from './latent-skills.service.spec';
import {FfbeUtils} from '../utils/ffbe-utils';

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

class LatentSkillsServiceMock {
  public searchForLatentSkillsByCharacterGumiId(id) {
    return [];
  }
}

export class CharactersServiceMock {
  private static INSTANCE: CharactersServiceMock = new CharactersServiceMock();

  public static getInstance() {
    return CharactersServiceMock.INSTANCE;
  }

  public searchForCharacterByGumiId(id: number): Character {
    return null;
  }
}

describe('CharactersService', () => {
  let dataMiningService = null;
  let skillsService = null;
  let enhancementsService = null;
  let latentSkillsService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersService,
        {provide: DataMiningClientService, useClass: DataMiningMock},
        {provide: SkillsService, useClass: SkillsServiceMock},
        {provide: LimitBurstsService, useClass: LimitBurstServiceMock},
        {provide: EnhancementsService, useClass: EnhancementsServiceMock},
        {provide: LatentSkillsService, useClass: LatentSkillsServiceMock}
      ]
    });
  });

  beforeEach(inject([DataMiningClientService, SkillsService, EnhancementsService, LatentSkillsService],
    (dmService: DataMiningClientService, sService: SkillsService, eService: EnhancementsService,
     lsService: LatentSkillsService) => {
      dataMiningService = dmService;
      skillsService = sService;
      enhancementsService = eService;
      latentSkillsService = lsService;

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
    const characters: Array<Character> = service.searchForCharactersByName('Hunter Rain');
    // THEN
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].gumi_id).toEqual(100000115);
    expect(characters[0].entries[100000115].upgraded_limitburst_id).toBeNull();
  }));

  it('should find the correct characters when searched if several characters with the same name are present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();

    // WHEN
    const characters: Array<Character> = service.searchForCharactersByName('Cloud (FFVII REMAKE)');
    // THEN
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(2);
    expect(characters[0].gumi_id).toEqual(207002007);
    expect(characters[1].gumi_id).toEqual(207002017);
  }));

  it('should find null when searched if character not present', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();
    // WHEN
    const personnages = service.searchForCharactersByName('Raining');
    // THEN
    expect(personnages).toBeFalsy();
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
    const characters: Array<Character> = service.searchForCharactersByName('Loren');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(213840);
    expect(mySpy).toHaveBeenCalledWith(227166);
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].entries.length === 3);
    expect(characters[0].entries['100009107'].upgraded_limitburst_id).toEqual(900000087);
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
    const characters: Array<Character> = service.searchForCharactersByName('Serah');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(234212);
    expect(mySpy).toHaveBeenCalledWith(234232);
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].entries.length === 3);
    expect(characters[0].entries['250000107'].upgraded_limitburst_id).toEqual(900000353);
  }));

  it('should find the correct enhanced-by-enhanced-skill limit burst ID when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
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
    const characters: Array<Character> = service.searchForCharactersByName('Raegen');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(4);
    expect(mySpy).toHaveBeenCalledWith(101370);
    expect(mySpy).toHaveBeenCalledWith(228085);
    expect(mySpy).toHaveBeenCalledWith(707785);
    expect(mySpy).toHaveBeenCalledWith(707786);
    expect(myEnhancementsSpy).toHaveBeenCalledTimes(4);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(101370);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(228085);
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].entries.length === 3);
    expect(characters[0].entries['100010007'].upgraded_limitburst_id).toEqual(900000330);
  }));

  it('should find the correct enhanced-by-latent-skill limit burst ID when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const skill1: Skill = skills['100020'];
    skill1.gumi_id = 100020;
    const skill2: Skill = skills['100021'];
    skill2.gumi_id = 100021;
    const skill3: Skill = skills['950144'];
    skill3.gumi_id = 950144;
    const skill4: Skill = skills['950145'];
    skill4.gumi_id = 950145;
    const skill5: Skill = skills['800352'];
    skill5.gumi_id = 800352;
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1),
      Skill.produce(skill2), Skill.produce(skill3), Skill.produce(skill4), Skill.produce(skill5));

    const enhancements = JSON.parse(ENHANCEMENTS_TEST_DATA);

    const enhancement1 = enhancements['228085001'];
    enhancement1.gumi_id = 228085001;
    enhancement1.level = 1;
    const enhancement2 = enhancements['228085002'];
    enhancement2.gumi_id = 228085002;
    enhancement2.level = 2;
    const myEnhancementsSpy = spyOn(enhancementsService, 'searchForEnhancementsBySkillGumiId').and
      .returnValues([], [], [], [enhancement1, enhancement2]);

    const latentSkills = JSON.parse(LATENT_SKILLS_TEST_DATA);
    const latentSkill1 = latentSkills['8003520'];
    const latentSkill2 = latentSkills['8003521'];
    const latentSkill3 = latentSkills['8003522'];
    const myLatentSkillsSpy = spyOn(latentSkillsService, 'searchForLatentSkillsByCharacterGumiId').and
      .returnValue([latentSkill1, latentSkill2, latentSkill3]);

    const loadedCharacters = service['charactersFromDataMining'];
    loadedCharacters['100016205']['skills'] = [loadedCharacters['100016205']['skills'][2], loadedCharacters['100016205']['skills'][23]];

    service.loadCharactersFromDataMining();
    // WHEN
    const characters: Array<Character> = service.searchForCharactersByName('Hyoh');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(5);
    expect(mySpy).toHaveBeenCalledWith(227287);
    expect(mySpy).toHaveBeenCalledWith(227296);
    expect(mySpy).toHaveBeenCalledWith(950144);
    expect(mySpy).toHaveBeenCalledWith(950145);
    expect(mySpy).toHaveBeenCalledWith(800352);
    expect(myEnhancementsSpy).toHaveBeenCalledTimes(4);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(227287);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(227296);
    expect(myLatentSkillsSpy).toHaveBeenCalledTimes(1);
    expect(myLatentSkillsSpy).toHaveBeenCalledWith(100016205);
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].entries.length === 3);
    expect(characters[0].entries['100016207'].upgraded_limitburst_id).toEqual(950000012);
  }));

  it('should filter out enhanced skills for other characters when searching if present in data mining', inject([CharactersService], (service: CharactersService) => {
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
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and
      .returnValues(Skill.produce(skill1), Skill.produce(skill2), Skill.produce(skill3), Skill.produce(skill4));

    const enhancements = JSON.parse(ENHANCEMENTS_TEST_DATA);

    const enhancement1 = enhancements['228085001'];
    enhancement1.gumi_id = 228085001;
    enhancement1.level = 1;
    enhancement1.units = [100009105];
    const enhancement2 = enhancements['228085002'];
    enhancement2.gumi_id = 228085002;
    enhancement2.level = 2;
    enhancement1.units = [100009105];
    const myEnhancementsSpy = spyOn(enhancementsService, 'searchForEnhancementsBySkillGumiId').and
      .returnValues([], [], [], [enhancement1, enhancement2]);

    const loadedCharacters = service['charactersFromDataMining'];
    loadedCharacters['100010005']['skills'] = [loadedCharacters['100010005']['skills'][4], loadedCharacters['100010005']['skills'][32]];

    service.loadCharactersFromDataMining();
    // WHEN
    const characters: Array<Character> = service.searchForCharactersByName('Raegen');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(101370);
    expect(mySpy).toHaveBeenCalledWith(228085);
    expect(myEnhancementsSpy).toHaveBeenCalledTimes(4);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(101370);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(228085);
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].entries.length === 3);
    expect(characters[0].entries['100010007'].upgraded_limitburst_id).toBeNull();
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
    const characters: Array<Character> = service.searchForCharactersByName('Loren');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(4);
    expect(mySpy).toHaveBeenCalledWith(213840);
    expect(mySpy).toHaveBeenCalledWith(209530);
    expect(mySpy).toHaveBeenCalledWith(213820);
    expect(mySpy).toHaveBeenCalledWith(227166);
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].entries.length === 3);
    expect(characters[0].entries['100009107'].upgraded_limitburst_id).toEqual(900000087);
  }));

  it('should find the all enhanced-by-enhanced-skill limit burst IDs when searched if present in data mining', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const skill1: Skill = skills['100020'];
    skill1.gumi_id = 100020;
    const skill2: Skill = skills['230020'];
    skill2.gumi_id = 230020;
    const skill3: Skill = skills['914071'];
    skill3.gumi_id = 914071;
    const skill4: Skill = skills['914072'];
    skill4.gumi_id = 914072;
    const mySpy = spyOn(skillsService, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2), Skill.produce(skill3), Skill.produce(skill4));

    const enhancements = JSON.parse(ENHANCEMENTS_TEST_DATA);

    const enhancement1 = enhancements['230020001'];
    enhancement1.gumi_id = 230020001;
    enhancement1.level = 1;
    const enhancement2 = enhancements['230020002'];
    enhancement2.gumi_id = 230020001;
    enhancement2.level = 2;
    const myEnhancementsSpy = spyOn(enhancementsService, 'searchForEnhancementsBySkillGumiId').and
      .returnValues([], [], [], [enhancement1, enhancement2]);

    const loadedCharacters = service['charactersFromDataMining'];
    loadedCharacters['310000105']['skills'] = [loadedCharacters['310000105']['skills'][0], loadedCharacters['310000105']['skills'][16]];

    service.loadCharactersFromDataMining();
    // WHEN
    const characters: Array<Character> = service.searchForCharactersByName('2B');
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(4);
    expect(mySpy).toHaveBeenCalledWith(218540);
    expect(mySpy).toHaveBeenCalledWith(230020);
    expect(mySpy).toHaveBeenCalledWith(914071);
    expect(mySpy).toHaveBeenCalledWith(914072);
    expect(myEnhancementsSpy).toHaveBeenCalledTimes(4);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(218540);
    expect(myEnhancementsSpy).toHaveBeenCalledWith(230020);
    expect(characters).toBeTruthy();
    expect(characters.length).toEqual(1);
    expect(characters[0].entries.length === 3);
    expect(characters[0].entries['310000107'].upgraded_limitburst_id).toEqual(950000023);
  }));

  it('should filter CharacterSkills for each CharacterEntry correctly when loading an awakened Neo-Vision Character', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();

    // WHEN
    const character: Character = service.searchForCharacterByGumiId(207000305);

    // THEN
    expect(character).toBeTruthy();
    expect(character.entries.length === 4);
    expect(character.entries['207000305'].characterEntrySkills.length).toEqual(6);
    expect(character.entries['207000306'].characterEntrySkills.length).toEqual(14);
    expect(character.entries['207000307'].characterEntrySkills.length).toEqual(20);
    expect(character.entries['207000307'].characterEntrySkills.filter(characterEntrySkill => characterEntrySkill.id === 227843).length).toEqual(1);
    expect(character.entries['207000307'].characterEntrySkills.filter(characterEntrySkill => characterEntrySkill.id === 236118).length).toEqual(0);
    expect(character.entries['207000317'].characterEntrySkills.length).toEqual(26);
  }));

  it('should filter CharacterSkills correctly when loading the Brave-Shift form of an awakened Neo-Vision Character', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();

    // WHEN
    const character: Character = service.searchForCharacterByGumiId(207000327);

    // THEN
    expect(character).toBeTruthy();
    expect(character.entries.length === 1);
    expect(character.entries['207000327'].characterEntrySkills.length).toEqual(14);
    expect(character.entries['207000327'].characterEntrySkills.filter(characterEntrySkill => characterEntrySkill.id === 230765).length).toEqual(1);
  }));

  it('should filter CharacterSkills correctly when loading a native Neo-Vision Character', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();

    // WHEN
    const character: Character = service.searchForCharacterByGumiId(207002007);

    // THEN
    expect(character).toBeTruthy();
    expect(character.entries.length === 1);
    expect(character.entries['207002007'].characterEntrySkills.length).toEqual(19);
    expect(character.entries['207002007'].characterEntrySkills.filter(characterEntrySkill => characterEntrySkill.id === 236034).length).toEqual(1);
  }));

  it('should filter CharacterSkills correctly when loading the Brave-Shift form of an native Neo-Vision Character', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();

    // WHEN
    const character: Character = service.searchForCharacterByGumiId(207002017);

    // THEN
    expect(character).toBeTruthy();
    expect(character.entries.length === 1);
    expect(character.entries['207002017'].characterEntrySkills.length).toEqual(20);
    expect(character.entries['207002017'].characterEntrySkills.filter(characterEntrySkill => characterEntrySkill.id === 236047).length).toEqual(1);
  }));

  it('should not load nested properties when loading a shallow character', inject([CharactersService], (service: CharactersService) => {
    // GIVEN
    service.loadCharactersFromDataMining();

    // WHEN
    const character: Character = service.searchForShallowCharacterByGumiId(207002017);

    // THEN
    expect(character).toBeTruthy();
    expect(character.entries.length === 1);
    expect(character.skills.length).toEqual(20);
    expect(character.skills.every(skill => FfbeUtils.isNullOrUndefined(skill.skill))).toBeTrue();
    expect(character.entries['207002017'].characterEntrySkills).toBeFalsy();
  }));

});
