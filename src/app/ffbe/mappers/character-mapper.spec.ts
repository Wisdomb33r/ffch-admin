import {Character} from '../model/character.model';
import {CHARACTER_TEST_DATA} from '../model/character.model.spec';
import {PASSIVE_SKILLS_TEST_DATA, ABILITY_SKILLS_TEST_DATA} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {CharacterMapper} from './character-mapper';

describe('CharacterMapper', () => {

  it('should create UniteCompetences correctly when mapping an awakened Neo-Vision Character', () => {
    // GIVEN
    const skills = {...(JSON.parse(PASSIVE_SKILLS_TEST_DATA)), ...(JSON.parse(ABILITY_SKILLS_TEST_DATA))};
    const skill1: Skill = skills['100021'];
    skill1.gumi_id = 100021;
    const skill2: Skill = skills['232639'];
    skill2.gumi_id = 232639;
    const skill3: Skill = skills['707785'];
    skill3.gumi_id = 707785;
    const skill4: Skill = skills['200270'];
    skill4.gumi_id = 200270;

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000305'];
    character.skills = JSON.parse('[' +
      '{"rarity": 5, "level": 39, "type": "ABILITY", "id": 100021},' +
      '{"rarity": 6, "level": 20, "type": "ABILITY", "id": 232639},' +
      '{"rarity": 7, "level": 110, "type": "ABILITY", "id": 707785},' +
      '{"rarity": 7, "level": 120, "type": "ABILITY", "id": 200270, "brave_ability": 1}' +
      ']');
    character.skills[0].skill = Skill.produce(skill1);
    character.skills[1].skill = Skill.produce(skill2);
    character.skills[2].skill = Skill.produce(skill3);
    character.skills[3].skill = Skill.produce(skill4);

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
    const skills = {...(JSON.parse(PASSIVE_SKILLS_TEST_DATA)), ...(JSON.parse(ABILITY_SKILLS_TEST_DATA))};
    const skill1: Skill = skills['100021'];
    skill1.gumi_id = 100021;
    const skill2: Skill = skills['232639'];
    skill2.gumi_id = 232639;

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000327'];
    character.skills = JSON.parse('[' +
      '{"rarity": 7, "level": 120, "type": "ABILITY", "id": 100021, "brave_ability": 1},' +
      '{"rarity": 7, "level": 120, "type": "ABILITY", "id": 232639, "brave_ability": 1}' +
      ']');

    character.skills[0].skill = Skill.produce(skill1);
    character.skills[1].skill = Skill.produce(skill2);

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
    expect(personnage.unites[0].competences[1].niveau).toEqual(120);
  });

  it('should create UniteCompetences correctly when mapping an native Neo-Vision Character', () => {
    // GIVEN
    const skills = {...(JSON.parse(PASSIVE_SKILLS_TEST_DATA)), ...(JSON.parse(ABILITY_SKILLS_TEST_DATA))};
    const skill1: Skill = skills['100021'];
    skill1.gumi_id = 100021;
    const skill2: Skill = skills['232639'];
    skill2.gumi_id = 232639;

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207002007'];
    character.skills = JSON.parse('[' +
      '{"rarity": 7, "level": 50, "type": "ABILITY", "id": 100021, "brave_ability": 1},' +
      '{"rarity": 7, "level": 110, "type": "ABILITY", "id": 232639, "brave_ability": 1}' +
      ']');

    character.skills[0].skill = Skill.produce(skill1);
    character.skills[1].skill = Skill.produce(skill2);

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
    const skills = {...(JSON.parse(PASSIVE_SKILLS_TEST_DATA)), ...(JSON.parse(ABILITY_SKILLS_TEST_DATA))};
    const skill1: Skill = skills['100021'];
    skill1.gumi_id = 100021;
    const skill2: Skill = skills['232639'];
    skill2.gumi_id = 232639;

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207002017'];
    character.skills = JSON.parse('[' +
      '{"rarity": 7, "level": 30, "type": "ABILITY", "id": 100021, "brave_ability": 1},' +
      '{"rarity": 7, "level": 115, "type": "ABILITY", "id": 232639, "brave_ability": 1}' +
      ']');

    character.skills[0].skill = Skill.produce(skill1);
    character.skills[1].skill = Skill.produce(skill2);

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

});


