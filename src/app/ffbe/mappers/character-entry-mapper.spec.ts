import {ABILITY_SKILLS_TEST_DATA, PASSIVE_SKILLS_TEST_DATA} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {CHARACTER_TEST_DATA} from '../model/character/character.model.spec';
import {Character} from '../model/character/character.model';
import {CharacterEntryMapper} from './character-entry-mapper';

describe('CharacterEntryMapper', function () {
  it('should parse EX stats of non-neovision unit correctly', () => {
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
    const unite = CharacterEntryMapper.toUnite(character.entries['207000305'], 207000305, character);

    // THEN
    expect(unite).toBeTruthy();
    expect(unite.caracEX).toBeNull();
  });
});
