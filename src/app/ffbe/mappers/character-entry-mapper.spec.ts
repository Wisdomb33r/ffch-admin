import {ABILITY_SKILLS_TEST_DATA, PASSIVE_SKILLS_TEST_DATA} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {CHARACTER_TEST_DATA} from '../model/character/character.model.spec';
import {Character} from '../model/character/character.model';
import {CharacterEntryMapper} from './character-entry-mapper';
import {Caracteristiques} from '../model/caracteristiques.model';

describe('CharacterEntryMapper', function () {
  it('should parse EX stats of non-NeoVision unit correctly', () => {
    // GIVEN
    const skills = {...(JSON.parse(PASSIVE_SKILLS_TEST_DATA)), ...(JSON.parse(ABILITY_SKILLS_TEST_DATA))};
    const skill1: Skill = skills['100021'];
    skill1.gumi_id = 100021;
    const skill2: Skill = skills['232639'];
    skill2.gumi_id = 232639;

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000305'];
    character.skills = JSON.parse('[' +
      '{"rarity": 5, "level": 39, "type": "ABILITY", "id": 100021},' +
      '{"rarity": 5, "level": 56, "type": "ABILITY", "id": 232639}' +
      ']');

    character.skills[0].skill = Skill.produce(skill1);
    character.skills[1].skill = Skill.produce(skill2);

    character.entries['207000305'].characterEntrySkills = character.skills;

    // WHEN
    const unite = CharacterEntryMapper.toUnite(character.entries['207000305'], 207000305, character, []);

    // THEN
    expect(unite).toBeTruthy();
    expect(unite.caracEX).toBeUndefined();
  });

  it('should parse EX stats of NeoVision unit correctly', () => {
    // GIVEN
    const skills = {...(JSON.parse(PASSIVE_SKILLS_TEST_DATA)), ...(JSON.parse(ABILITY_SKILLS_TEST_DATA))};
    const skill1: Skill = skills['100021'];
    skill1.gumi_id = 100021;
    const skill2: Skill = skills['232639'];
    skill2.gumi_id = 232639;

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000305'];
    character.skills = JSON.parse('[' +
      '{"rarity": 5, "level": 39, "type": "ABILITY", "id": 100021},' +
      '{"rarity": 5, "level": 56, "type": "ABILITY", "id": 232639}' +
      ']');

    character.skills[0].skill = Skill.produce(skill1);
    character.skills[1].skill = Skill.produce(skill2);

    character.entries['207000317'].characterEntrySkills = character.skills;

    // WHEN
    const unite = CharacterEntryMapper.toUnite(character.entries['207000317'], 207000317, character, []);

    // THEN
    expect(unite).toBeTruthy();
    expect(unite.caracEX).toBeTruthy();
    expect(unite.caracEX.length).toEqual(3);
    expect(unite.caracEX[0].level).toEqual(121);
    expect(unite.caracEX[1].level).toEqual(122);
    expect(unite.caracEX[2].level).toEqual(123);
    expect(unite.caracEX[0].base).toEqual(new Caracteristiques(618, 31, 27, 22, 20, 24));
    expect(unite.caracEX[1].base).toEqual(new Caracteristiques(475, 24, 21, 17, 16, 19));
    expect(unite.caracEX[2].base).toEqual(new Caracteristiques(333, 17, 14, 12, 11, 13));
  });

});
