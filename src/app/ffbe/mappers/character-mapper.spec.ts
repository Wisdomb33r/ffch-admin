import {Character} from '../model/character/character.model';
import {CHARACTER_TEST_DATA} from '../model/character/character.model.spec';
import {SkillMockDataHelper} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {CharacterMapper} from './character-mapper';
import {SkillsServiceMock} from '../services/skills.service.spec';
import {SkillsService} from '../services/skills.service';
import {Unite} from '../model/unite.model';

describe('CharacterMapper', () => {

  it('should create UniteCompetences correctly when mapping an awakened Neo-Vision Character', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100021);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(232639);
    const skill3: Skill = SkillMockDataHelper.mockPassiveSkill(707785);
    const skill4: Skill = SkillMockDataHelper.mockAbilitySkill(200270);

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000305'];
    character.skills = JSON.parse('[' +
      '{"rarity": 5, "level": 39, "type": "ABILITY", "id": 100021},' +
      '{"rarity": 6, "level": 20, "type": "ABILITY", "id": 232639},' +
      '{"rarity": 7, "level": 110, "type": "ABILITY", "id": 707785},' +
      '{"rarity": "NV", "level": 120, "type": "ABILITY", "id": 200270, "ex_level": 0}' +
      ']');
    character.skills[0].skill = skill1;
    character.skills[1].skill = skill2;
    character.skills[2].skill = skill3;
    character.skills[3].skill = skill4;

    character.entries['207000305'].characterEntrySkills = character.skills.slice(0, 1);
    character.entries['207000306'].characterEntrySkills = character.skills.slice(0, 2);
    character.entries['207000307'].characterEntrySkills = character.skills.slice(0, 3);
    character.entries['207000317'].characterEntrySkills = character.skills;

    // WHEN
    const personnage = CharacterMapper.toPersonnage(character);

    // THEN
    expect(personnage).toBeTruthy();
    expect(personnage.unites.length === 4);
    expect(personnage.unites[0].competences.length).toEqual(1);
    expect(personnage.unites[0].competences[0].competence.gumi_id).toEqual(100021);
    expect(personnage.unites[0].competences[0].niveau).toEqual(39);

    expect(personnage.unites[1].competences.length).toEqual(2);
    expect(personnage.unites[1].competences[0].competence.gumi_id).toEqual(100021);
    expect(personnage.unites[1].competences[0].niveau).toEqual(1);
    expect(personnage.unites[1].competences[1].competence.gumi_id).toEqual(232639);
    expect(personnage.unites[1].competences[1].niveau).toEqual(20);

    expect(personnage.unites[2].competences.length).toEqual(3);
    expect(personnage.unites[2].competences[0].competence.gumi_id).toEqual(100021);
    expect(personnage.unites[2].competences[0].niveau).toEqual(1);
    expect(personnage.unites[2].competences[1].competence.gumi_id).toEqual(232639);
    expect(personnage.unites[2].competences[1].niveau).toEqual(1);
    expect(personnage.unites[2].competences[2].competence.gumi_id).toEqual(707785);
    expect(personnage.unites[2].competences[2].niveau).toEqual(110);

    expect(personnage.unites[3].competences.length).toEqual(4);
    expect(personnage.unites[3].competences[0].competence.gumi_id).toEqual(100021);
    expect(personnage.unites[3].competences[0].niveau).toEqual(1);
    expect(personnage.unites[3].competences[1].competence.gumi_id).toEqual(232639);
    expect(personnage.unites[3].competences[1].niveau).toEqual(1);
    expect(personnage.unites[3].competences[2].competence.gumi_id).toEqual(707785);
    expect(personnage.unites[3].competences[2].niveau).toEqual(1);
    expect(personnage.unites[3].competences[3].competence.gumi_id).toEqual(200270);
    expect(personnage.unites[3].competences[3].niveau).toEqual(120);
  });

  it('should create UniteCompetences correctly when mapping an awakened Brave-Shift Character', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100021);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(232639);

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000327'];
    character.skills = JSON.parse('[' +
      '{"rarity": "NV", "level": 120, "type": "ABILITY", "id": 100021, "ex_level": 0},' +
      '{"rarity": "NV", "level": 120, "type": "ABILITY", "id": 232639, "ex_level": 2}' +
      ']');

    character.skills[0].skill = skill1;
    character.skills[1].skill = skill2;

    character.entries['207000327'].characterEntrySkills = character.skills;

    // WHEN
    const personnage = CharacterMapper.toPersonnage(character);

    // THEN
    expect(personnage).toBeTruthy();
    expect(personnage.unites.length === 1);
    expect(personnage.unites[0].competences.length).toEqual(2);
    expect(personnage.unites[0].competences[0].competence.gumi_id).toEqual(100021);
    expect(personnage.unites[0].competences[0].niveau).toEqual(120);
    expect(personnage.unites[0].competences[1].competence.gumi_id).toEqual(232639);
    expect(personnage.unites[0].competences[1].niveau).toEqual(-2222);
  });

  it('should create UniteCompetences correctly when mapping an native Neo-Vision Character', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100021);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(232639);

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207002007'];
    character.skills = JSON.parse('[' +
      '{"rarity": "NV", "level": 50, "type": "ABILITY", "id": 100021, "ex_level": 0},' +
      '{"rarity": "NV", "level": 110, "type": "ABILITY", "id": 232639, "ex_level": 0}' +
      ']');

    character.skills[0].skill = skill1;
    character.skills[1].skill = skill2;

    character.entries['207002007'].characterEntrySkills = character.skills;

    // WHEN
    const personnage = CharacterMapper.toPersonnage(character);

    // THEN
    expect(personnage).toBeTruthy();
    expect(personnage.unites.length === 1);
    expect(personnage.unites[0].competences.length).toEqual(2);
    expect(personnage.unites[0].competences[0].competence.gumi_id).toEqual(100021);
    expect(personnage.unites[0].competences[0].niveau).toEqual(50);
    expect(personnage.unites[0].competences[1].competence.gumi_id).toEqual(232639);
    expect(personnage.unites[0].competences[1].niveau).toEqual(110);
  });

  it('should create UniteCompetences correctly when mapping an native Brave-Shift Character', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100021);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(232639);

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207002017'];
    character.skills = JSON.parse('[' +
      '{"rarity": "NV", "level": 30, "type": "ABILITY", "id": 100021, "ex_level": 0},' +
      '{"rarity": "NV", "level": 115, "type": "ABILITY", "id": 232639, "ex_level": 0}' +
      ']');

    character.skills[0].skill = skill1;
    character.skills[1].skill = skill2;

    character.entries['207002017'].characterEntrySkills = character.skills;

    // WHEN
    const personnage = CharacterMapper.toPersonnage(character);

    // THEN
    expect(personnage).toBeTruthy();
    expect(personnage.unites.length === 1);
    expect(personnage.unites[0].competences.length).toEqual(2);
    expect(personnage.unites[0].competences[0].competence.gumi_id).toEqual(100021);
    expect(personnage.unites[0].competences[0].niveau).toEqual(30);
    expect(personnage.unites[0].competences[1].competence.gumi_id).toEqual(232639);
    expect(personnage.unites[0].competences[1].niveau).toEqual(115);
  });

  function checkActivatedSkillsForUnite(unite: Unite) {
    expect(unite.competencesActivees.length).toEqual(3);
    expect(unite.competencesActivees[0].competence.gumi_id).toEqual(501090);
    expect(unite.competencesActivees[0].competence.id).toEqual(123);
    expect(unite.competencesActivees[0].niveau).toEqual(-200);
    expect(unite.competencesActivees[1].competence.gumi_id).toEqual(501100);
    expect(unite.competencesActivees[1].competence.id).toEqual(456);
    expect(unite.competencesActivees[1].niveau).toEqual(-198);
    expect(unite.competencesActivees[2].competence.gumi_id).toEqual(501110);
    expect(unite.competencesActivees[2].competence.id).toEqual(789);
    expect(unite.competencesActivees[2].niveau).toEqual(-196);
  }

  it('should create UniteCompetences correctly for activated skills', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100021);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(208930);
    const skill3: Skill = SkillMockDataHelper.mockAbilitySkill(501090);
    const skill4: Skill = SkillMockDataHelper.mockAbilitySkill(501100);
    const skill5: Skill = SkillMockDataHelper.mockAbilitySkill(501110);

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.callFake(input => {
      switch (input) {
        case 100021:
          return skill1;
        case 208930:
          return skill2;
        case 501090:
          return skill3;
        case 501100:
          return skill4;
        case 501110:
          return skill5;
        default:
          console.error('SearchForSkillByGumiId called for non-mocked skill ' + input);
      }
    });

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['100010005'];
    character.skills = JSON.parse('[' +
      '{"rarity": "5", "level": 30, "type": "ABILITY", "id": 100021},' +
      '{"rarity": "5", "level": 80, "type": "ABILITY", "id": 208930}' +
      ']');

    character.skills[0].skill = skill1;
    character.skills[1].skill = skill2;

    character.entries['100010005'].characterEntrySkills = character.skills;
    character.entries['100010006'].characterEntrySkills = character.skills;
    character.entries['100010007'].characterEntrySkills = character.skills;

    const personnage = CharacterMapper.toPersonnage(character);

    // WHEN
    personnage.unites[1].competencesActivees[0].competence.id = 123;
    personnage.unites[1].competencesActivees[1].competence.id = 456;
    personnage.unites[1].competencesActivees[2].competence.id = 789;

    // THEN
    expect(mySpy).toHaveBeenCalledTimes(12);
    expect(mySpy).toHaveBeenCalledWith(501090);
    expect(mySpy).toHaveBeenCalledWith(501100);
    expect(mySpy).toHaveBeenCalledWith(501110);
    expect(personnage).toBeTruthy();
    expect(personnage.unites.length === 3);
    checkActivatedSkillsForUnite(personnage.unites[0]);
    checkActivatedSkillsForUnite(personnage.unites[1]);
    checkActivatedSkillsForUnite(personnage.unites[2]);
  });

});


